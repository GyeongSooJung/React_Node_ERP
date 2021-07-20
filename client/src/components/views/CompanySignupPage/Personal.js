import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

//리덕스
import {useDispatch} from 'react-redux';
import {emailSend, emailCert} from '../../../_actions/email_action';
import {signupCompany} from '../../../_actions/user_action';

//주소 검색
import DaumPostCode from 'react-daum-postcode';

//쿠키 사용
import { useCookies } from "react-cookie";

//z//bcrypt

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Review(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [cookies, setCookie, removeCookie] = useCookies(['hashAuth']);
  
  
  let userbody = props.formParent.user;
  let activeStep = props.formParent.activeStep;
  
  let [user, setUserState] = useState(userbody);
  let [emailcertCheck, setEmailCertCheck] = useState("");
  let [emailsendCheck, setEmailSendCheck] = useState(false);
  let [minutes, setMinutes] = useState(parseInt(0));
  let [seconds, setSeconds] = useState(parseInt(0));
  
  let [authCookie, setAuthCookie] = useState("");
  let [Cookiebool, setCookieBool] = useState(true);
  
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
    dispatch(emailSend(user))
    .then(response => {
      console.log(response.payload.result)
      if(response.payload.result == 'send') {
        setEmailSendCheck(true);
        setMinutes(5);
        setSeconds(0);
        const hashAuth = response.payload.hashAuth;
        setCookie('hashAuth',hashAuth,{path: '/', expires: new Date(Date.now()+300000)});
        
        setAuthCookie(hashAuth);
      }
      else if(response.payload.result == 'exist') {
        alert('중복된 이메일이 존재합니다.')
      }
      else {
        alert('다시 확인해주세요.')
      }
        
      });
  }
  
  const emailcertHandler = (event) => {
    dispatch(emailCert({CEA : authNum, CEA2 : authCookie}))
    .then(response => {
        if(response.payload.result == 'success') {
          setEmailCertCheck(true);
          setCookieBool(false);
          alert('확인됐습니다.');
          removeCookie('hashAuth');
        } 
        else {
          alert('다시 확인해주세요.');
        }
      })
  }
  
  const onSignupHandler = (event) => {
    event.preventDefault();
    if(!emailcertCheck) {
      alert('이메일 인증을 받아주세요.');
    }
    else {
      console.log(user)
      // alert('회원가입이 완료되었습니다. 로그인해주세요');
      // const data = { user : user, activeStep : activeStep + 1 };
      // props.onChange(data);
      
      const data = { user : user, activeStep : activeStep + 1 };
      props.onChange(data);
    }
  }
  
  useEffect(() => {
    if(cookies.hashAuth !== undefined){
      setCookieBool(true)
    }
    else {
      setCookieBool(false)
    }
  },[]);
  
  useEffect(() => {
  const countdown = setInterval(() => {
    if (parseInt(seconds) > 0) {
      setSeconds(parseInt(seconds) - 1);
    }
    if (parseInt(seconds) === 0) {
      if (parseInt(minutes) === 0) {
          clearInterval(countdown);
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
      
      <form className={classes.form} onSubmit={onSignupHandler}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="ENA"
              label="이름"
              type="text"
              id="ENA"
              value={ENA}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.ENA ? true : false }
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="EAD"
              label="주소"
              type="text"
              id="EAD"
              value={EAD}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.EAD ? true : false }
              }}
              disabled="true"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
              <Button 
                  variant="contained"
                  color="primary"
                  fullWidth
                  size='large'
                  onClick={Addresspop}
              >
              주소 검색
              </Button>
          </Grid>
          {AddressOn ? <DaumPostCode onComplete={handleComplete} className="post-code" /> : ""}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="EAD2"
              label="상세 주소"
              type="text"
              id="EAD2"
              value={EAD2}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.EAD2 ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="EPH"
              label="휴대폰번호"
              type="text"
              id="EPH"
              value={EPH}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.EPH ? true : false }
              }}
            />
          </Grid>
          
          {emailsendCheck ?
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="EEM"
                label="이메일"
                type="text"
                id="EEM"
                value={EEM}
                onChange={onDataHandler}
                InputProps={{
                  readOnly : () => { return userbody.EEM ? true : false }
                }}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="contained"
                color="primary"
                fullWidth
                size='large'
                onClick={emailsendHandler}
                disabled
                >
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={8}>
              <TextField
              variant="outlined"
                required
                fullWidth
                name="authNum"
                label="인증 번호"
                type="text"
                id="authNum"
                value={authNum}
                onChange={onDataHandler}
            />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Button 
                  variant="contained"
                  color="primary"
                  fullWidth
                  size='large'
                  onClick={emailcertHandler}
                  disabled = {Cookiebool}
                  >
                  인증
                </Button>
            </Grid>
          </Grid>
          : 
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="EEM"
                label="이메일"
                type="text"
                id="EEM"
                value={EEM}
                onChange={onDataHandler}
                InputProps={{
                  readOnly : () => { return userbody.EEM ? true : false }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button 
                variant="contained"
                color="primary"
                fullWidth
                size='large'
                onClick={emailsendHandler}
                >
                보내기
              </Button>
            </Grid>
          </Grid>
          }
          
          
          <Grid item xs={12} sm={4} />
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onBeforeHandler}
            >
              이전
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              회원 가입
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}