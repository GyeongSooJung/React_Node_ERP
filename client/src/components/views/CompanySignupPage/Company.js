import React, { useState } from 'react';
import { Typography, Grid, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//리덕스
import {useDispatch} from 'react-redux';
import {cnuCheck} from '../../../_actions/user_action';

//주소 검색
import DaumPostCode from 'react-daum-postcode';

//쿠키 사용
import { useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  verticalCenter: {
      display: 'flex',
      alignItems: 'center',
  },
  colorButton: {
    marginTop: theme.spacing(3),
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

export default function CompanytForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  let userbody = props.formParent.user;
  let activeStep = props.formParent.activeStep;
  
  let [user, setUserState] = useState(userbody);
  let [CNUcheck, setCNUcheck] = useState(userbody.CNUcheck);
  
  //쿠키 제거하기위한 함수
  const [cookies, setCookie, removeCookie] = useCookies(['hashAuth']);
  removeCookie('hashAuth')
  
  // 주소 확인 여부
  let [AddressOn, setAddressOn] = useState(false);
  
  let {CNU, CNA, CAD, CAD2, CEON, CEOP, CTEL, CFAX, CEM} = user
  
  const onBeforeHandler = (event) => {
    const data = { user : user, activeStep : activeStep - 1 };
    props.onChange(data);
  }
  
  const onNextHandler = (event) => {
    event.preventDefault();
    user.CNUcheck = CNUcheck;
    const data = { user : user, activeStep : activeStep + 1 };
    props.onChange(data);
  }
  
  const onDataHandler = (event) => {
    setUserState({...user, [event.target.name] : event.target.value});
  }
  
  // 사업자 번호 유효성 검사
  const onCNUcheckHandler = (event) => {
    dispatch(cnuCheck(user))
    .then(response => {
            if(response.payload.CRNumber == "complete") {
              alert('유효한 사업자번호입니다.');
              setCNUcheck(response.payload.CRNumber);
            }
            else if (response.payload.CRNumber == "duplicated"){
              alert('중복된 사업자 번호가 존재합니다.');
            }
            
            else {
              alert('유효하지 않은 사업자번호입니다.');
            }
        })
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
        user.CAD = fullAddress;
        setUserState(user);
        setAddressOn(false);
    }
    
  const Addresspop = () => {
    setAddressOn(true);
  }
  
  const numValidation = (input) => {
    let check = /[^-0-9]/g;
    return check.test(input);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        사업자 정보
      </Typography>
      <form onSubmit={onNextHandler}>
        <Grid container>
          <Grid item xs={12} className={classes.verticalCenter}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CNU"
              label="사업자등록번호"
              type="text"
              id="CNU"
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
              value={CNU}
              onChange={onDataHandler}
              disabled={CNUcheck}
            />
            <Button
              className={classes.formButton}
              onClick={onCNUcheckHandler}
              disabled={CNUcheck}
              classes={{
                disabled: classes.disabled
              }}
            >
            인증
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CNA"
              label="업체명"
              type="text"
              id="CNA"
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
              value={CNA}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12} className={classes.verticalCenter}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CAD"
              label="주소"
              type="text"
              id="CAD"
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
              value={CAD}
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
              name="CAD2"
              label="상세 주소"
              type="text"
              id="CAD2"
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
              value={CAD2}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={numValidation(CTEL)}
              helperText={(CTEL.length != 0) && numValidation(CTEL) ? "숫자만 입력해주세요." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CTEL"
              label="사업자 전화번호"
              type="text"
              id="CTEL"
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
              value={CTEL}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={numValidation(CFAX)}
              helperText={(CFAX.length != 0) && numValidation(CFAX) ? "숫자만 입력해주세요." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CFAX"
              label="사업자 팩스번호"
              type="text"
              id="CFAX"
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
              value={CFAX}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CEM"
              label="사업자 이메일"
              type="email"
              id="CEM"
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
              value={CEM}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CEON"
              label="대표자 이름"
              type="text"
              id="CEON"
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
              value={CEON}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={numValidation(CEOP)}
              helperText={(CEOP.length != 0) && numValidation(CEOP) ? "숫자만 입력해주세요." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CEOP"
              label="대표자 전화번호"
              type="text"
              id="CEOP"
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
              value={CEOP}
              onChange={onDataHandler}
            />
          </Grid>
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
            다음
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}