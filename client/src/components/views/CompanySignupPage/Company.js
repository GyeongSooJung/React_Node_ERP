import React, { useState, useEffect  } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

//리덕스
import {useDispatch} from 'react-redux';
import {cnuCheck} from '../../../_actions/user_action';

//주소 검색
import DaumPostCode from 'react-daum-postcode';

//쿠키 사용
import { useCookies } from "react-cookie";

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
              alert('확인됐습니다.');
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

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        사업자 정보
      </Typography>
      <form className={classes.form} onSubmit={onNextHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CNU"
              label="사업자등록번호"
              type="text"
              id="CNU"
              value={CNU}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CNU ? true : false }
              }}
              disabled={CNUcheck}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
              <Button 
                  variant="contained"
                  color="primary"
                  fullWidth
                  size='large'
                  onClick={onCNUcheckHandler}
                  disabled={CNUcheck}
              >
              인증
              </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CNA"
              label="업체명"
              type="text"
              id="CNA"
              value={CNA}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CNA ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CAD"
              label="주소"
              type="text"
              id="CAD"
              value={CAD}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CAD ? true : false }
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
              name="CAD2"
              label="상세 주소"
              type="text"
              id="CAD2"
              value={CAD2}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CAD2 ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CTEL"
              label="사업자 전화번호"
              type="text"
              id="CTEL"
              value={CTEL}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CTEL ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CFAX"
              label="사업자 팩스번호"
              type="text"
              id="CFAX"
              value={CFAX}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CFAX ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CEM"
              label="사업자 이메일"
              type="email"
              id="CEM"
              value={CEM}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CEM ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CEON"
              label="대표자 이름"
              type="text"
              id="CEON"
              value={CEON}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CEON ? true : false }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="CEOP"
              label="대표자 전화번호"
              type="text"
              id="CEOP"
              value={CEOP}
              onChange={onDataHandler}
              InputProps={{
                readOnly : () => { return userbody.CEOP ? true : false }
              }}
            />
          </Grid>
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
              다음
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}