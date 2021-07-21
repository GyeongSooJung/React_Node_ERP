import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, TextField, Button, Link, Box } from '@material-ui/core';

//리덕스
import {useDispatch} from 'react-redux';
import {emailSend, emailCert} from '../../../_actions/email_action';
import {signupCompany} from '../../../_actions/user_action';

//주소 검색
import DaumPostCode from 'react-daum-postcode';

// history -> 페이지 이동처리
import { useHistory } from "react-router-dom";

//쿠키 사용
import { useCookies } from "react-cookie";

//z//bcrypt

const useStyles = makeStyles((theme) => ({
  verticalCenter: {
      display: 'flex',
      alignItems: 'center',
  },
  colorButton: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1, 2),
    backgroundColor: '#d32f2f',
    color: 'white',
    
    '&:hover': {
        backgroundColor: '#b52626',
        color: '#f5f5f5'
    }
  },
  noColorButton: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 2),
    backgroundColor: 'grey',
    color: 'white',
    
    '&:hover': {
        backgroundColor: '#666666',
        color: 'white'
    }
  },
  flexRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  formButton: {
      margin: theme.spacing(1.1, 0, 0, 2),
      padding: theme.spacing(3.5, 2),
      width: '30%',
      height: '1.1876em',
      backgroundColor: '#d32f2f',
      color: 'white',
      
      '&:hover': {
          backgroundColor: '#b52626',
          color: '#f5f5f5'
      },
      
      '&$disabled': {
        backgroundColor: '#901e1e',
        color: '#e5e5e5'
      }
  },
  disabled: {},
  // textfield focus label style
  floatingLabelFocusStyle: {
    '&$focused': {
        color: '#d32f2f'
    }
  },
  // textfield focus box style
  fieldFocusStyle: {
    '&$focused $notchedOutline': {
        borderColor: '#d32f2f'
    }
  },
  focused: {},
  notchedOutline: {},
}));

export default function Review(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [cookies, setCookie, removeCookie] = useCookies(['hashAuth']);
  
  
  let userbody = props.formParent.user;
  let activeStep = props.formParent.activeStep;
  let signupResult = props.formParent.signupResult;
  
  let [user, setUserState] = useState(userbody);
  let [emailcertCheck, setEmailCertCheck] = useState(false);
  let [emailsendCheck, setEmailSendCheck] = useState(false);
  let [minutes, setMinutes] = useState(parseInt(0));
  let [seconds, setSeconds] = useState(parseInt(0));
  
  let [authCookie, setAuthCookie] = useState("");
  let [CookieBool, setCookieBool] = useState(false);
  
    // 주소 확인 여부
  let [AddressOn, setAddressOn] = useState(false);
  
  let { ENA, EAD, EAD2, EPH, EEM, authNum } = user;
  
  const onBeforeHandler = (event) => {
    const data = { user : user, activeStep : activeStep - 1 };
    props.onChange(data);
  }
  
  const onNextHandler = (event) => {
    event.preventDefault();
    const data = { user : user, activeStep : activeStep + 1 };
    props.onChange(data);
  }
  
  const onDataHandler = (event) => {
    setUserState({...user, [event.target.name] : event.target.value})
  }
  
    // 주소 검색 기능
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
        if (data.bname !== '') {
            extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
        }
        fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    //fullAddress -> 전체 주소반환
    user.EAD = fullAddress;
    setUserState(user);
    setAddressOn(false);
  }
    
  const Addresspop = () => {
    setAddressOn(true);
  }
  const emailsendHandler = async () => {
    if(EEM.length != 0) {
      dispatch(emailSend(user))
      .then(response => {
        if(response.payload.result == 'send') {
          setEmailSendCheck(true);
          setMinutes(0);
          setSeconds(5);
          const hashAuth = response.payload.hashAuth;
          setCookie('hashAuth',hashAuth,{path: '/', expires: new Date(Date.now()+300000)});
          
          setAuthCookie(hashAuth);
        }
        else if(response.payload.result == 'exist') {
          alert('중복된 이메일이 존재합니다.');
        }
        else {
          alert('다시 확인해주세요.');
        }
          
        });
    }
    else {
      alert('이메일을 입력해주세요.');
    }
  }
  
  const emailcertHandler = (event) => {
    if(authNum.length != 0 ) {
      dispatch(emailCert({CEA : authNum, CEA2 : authCookie}))
      .then(response => {
          if(response.payload.result == 'success') {
            setEmailCertCheck(true);
            alert('인증되었습니다.');
            removeCookie('hashAuth');
          }
          else {
            alert('인증번호를 다시 입력해주세요.');
          }
        })
    }
    else {
      alert('인증번호를 입력해주세요.');
    }
  }
  
  const onSignupHandler = (event) => {
    event.preventDefault();
    if(!emailcertCheck) {
      alert('이메일 인증을 받아주세요.');
    }
    else {
        dispatch(signupCompany(user))
        .then(response => {
          if(response.payload.result == true) {
            let data = { user : user, activeStep : activeStep + 1, signupResult : true };
            props.onChange(data);
          }
          else {
            let data = { user : user, activeStep : activeStep + 1, signupResult : false };
            props.onChange(data);
            alert('회원가입에 실패했습니다.\n정해진 양식에 맞게 다시 진행해주세요.');
            history.push('/signup');
          }
        });
    }
  }
  
  const numValidation = (input) => {
    let check = /[^-0-9]/g;
    return check.test(input);
  }
  
  useEffect(() => {
    console.log(cookies.hashAuth);
    if(!cookies.hashAuth){
      setCookieBool(false);
      console.log('bye');
    }
    else {
      setCookieBool(true);
      console.log('hi');
    }
  },[cookies.hashAuth]);
  
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          if(!emailcertCheck && CookieBool) {
            clearInterval(countdown);
            setEmailSendCheck(false);
            removeCookie('hashAuth');
            alert("인증번호가 만료되었습니다.");
          }
          else {
            clearInterval(countdown);
          }
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        개인 정보
      </Typography>
      
      <form onSubmit={onSignupHandler}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="ENA"
              label="이름"
              type="text"
              id="ENA"
              InputLabelProps={{
                classes: {
                    root: classes.floatingLabelFocusStyle,
                    focused: classes.focused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value={ENA}
              onChange={onDataHandler}
            />
          </Grid>
          
          <Grid item xs={12} className={classes.verticalCenter}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="EAD"
              label="주소"
              type="text"
              id="EAD"
              InputLabelProps={{
                classes: {
                    root: classes.floatingLabelFocusStyle,
                    focused: classes.focused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value={EAD}
              onChange={onDataHandler}
              disabled="true"
            />
            <Button 
              className={classes.formButton}
              onClick={Addresspop}
            >
            주소 검색
            </Button>
          </Grid>
          {AddressOn ? <DaumPostCode onComplete={handleComplete} className="post-code" /> : ""}
          <Grid item xs={12}>
            <TextField style={{marginTop: '2px'}}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="EAD2"
              label="상세 주소"
              type="text"
              id="EAD2"
              InputLabelProps={{
                classes: {
                    root: classes.floatingLabelFocusStyle,
                    focused: classes.focused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value={EAD2}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={numValidation(EPH)}
              helperText={(EPH.length != 0) && numValidation(EPH) ? "숫자만 입력해주세요." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="EPH"
              label="휴대폰번호"
              type="text"
              id="EPH"
              InputLabelProps={{
                classes: {
                    root: classes.floatingLabelFocusStyle,
                    focused: classes.focused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
              value={EPH}
              onChange={onDataHandler}
            />
          </Grid>
          
          {emailsendCheck ?
          <Grid container>
            <Grid item xs={12} className={classes.verticalCenter}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="EEM"
                label="이메일"
                type="text"
                id="EEM"
                InputLabelProps={{
                classes: {
                    root: classes.floatingLabelFocusStyle,
                    focused: classes.focused
                }
              }}
              InputProps={{
                classes: {
                  root: classes.fieldFocusStyle,
                  focused: classes.focused,
                  notchedOutline: classes.notchedOutline
                },
              }}
                value={EEM}
                onChange={onDataHandler}
                disabled
              />
              {CookieBool ?
              <Box
                width="30%"
                mt={1}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Link
                  disabled
                  mb={1}
                  variant="body1"
                  color="error"
                  underline="none"
                >
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </Link>
                <Link
                  style={{cursor: "pointer"}}
                  variant="body2"
                  color="textSecondary"
                  onClick={emailsendHandler}
                >
                재전송
                </Link>
              </Box>
              :
              null
              }
            </Grid>
            <Grid item xs={12} className={classes.verticalCenter}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="authNum"
                label="인증 번호"
                disabled={emailcertCheck}
                type="text"
                id="authNum"
                InputLabelProps={{
                  classes: {
                      root: classes.floatingLabelFocusStyle,
                      focused: classes.focused
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.fieldFocusStyle,
                    focused: classes.focused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
                value={authNum}
                onChange={onDataHandler}
              />
              <Button
                className={classes.formButton}
                onClick={emailcertHandler}
                disabled={emailcertCheck}
                classes={{
                  disabled: classes.disabled
                }}
                >
                인증
              </Button>
            </Grid>
          </Grid>
          : 
          <Grid container>
            <Grid item xs={12} className={classes.verticalCenter}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="EEM"
                label="이메일"
                type="text"
                id="EEM"
                InputLabelProps={{
                  classes: {
                      root: classes.floatingLabelFocusStyle,
                      focused: classes.focused
                  }
                }}
                InputProps={{
                  classes: {
                    root: classes.fieldFocusStyle,
                    focused: classes.focused,
                    notchedOutline: classes.notchedOutline
                  },
                }}
                value={EEM}
                onChange={onDataHandler}
              />
              <Button
                className={classes.formButton}
                onClick={emailsendHandler}
                >
                보내기
              </Button>
            </Grid>
          </Grid>
          }
          <Grid item xs={12} className={classes.flexRight}>
            <Button
              className={classes.noColorButton}
              onClick={onBeforeHandler}
            >
            이전
            </Button>
            <Button
              type="submit"
              className={classes.colorButton}
            >
            회원가입
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}