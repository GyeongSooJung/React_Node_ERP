import React, { useState, useEffect  } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// 패스워드 아이콘
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputAdornment from '@material-ui/core/InputAdornment';

//리덕스
import {useDispatch} from 'react-redux';
import {idDupleCheck} from '../../../_actions/user_action';

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

export default function AccountForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  let userbody = props.formParent.user; // 상위에서 받아온 user
  let activeStep = props.formParent.activeStep; // 상위에서 받아온 activeStep
  
  let [user, setUserState] = useState(userbody);
  let [IDcheck,setIDcheck] = useState(userbody.IDcheck);
  
  let { EID, EPW, PWC } = user;
  
  const onNextHandler = (event) => {
    event.preventDefault();
    if( !IDcheck )
    {
      alert('ID 중복체크를 해주세요.')
    }
    else if (EPW.length < 6) {
      alert('비밀번호를 6자 이상으로 써주세요.')
    }
    else if (EPW != PWC) {
      alert('현재 비밀번호와 확인 비밀번호가 다릅니다.')
    }
    else {
      user.IDcheck = IDcheck;
      const data = { user : user, activeStep : activeStep + 1 };
      props.onChange(data);
    }
  }
  
  const onDataHandler = (event) => {
    setUserState({...user, [event.target.name] : event.target.value})
  }
  
  const onIDcheckHandler = (event) => {
    dispatch(idDupleCheck(user))
        .then(response => {
            if(response.payload.result) {
              alert('확인됐습니다.');
              setIDcheck(true);
            } else {
                alert('중복된 아이디가 존재합니다.');
            }
        })
  }
  
  const hasError = passwordEntered =>
        EPW.length < 6 ? true : false;
  
  const hasNotSameError = passwordEntered =>
        EPW != PWC ? true : false; 
        
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        계정 정보
      </Typography>
      <form className={classes.form} onSubmit={onNextHandler}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="EID"
                      label="아이디"
                      name="EID"
                      autoComplete="ID"
                      value={EID}
                      onChange={onDataHandler}
                      InputProps={{
                        readOnly : () => { return userbody.CID ? true : false }
                      }}
                      disabled={IDcheck}
                  />
              </Grid>
              <Grid item xs={12} sm={4}>
                  <Button 
                      variant="contained"
                      color="primary"
                      fullWidth
                      size='large'
                      onClick={onIDcheckHandler}
                      disabled={IDcheck}
                  >
                   중복 확인
                  </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={hasError('password')}
                  helperText={(EPW.length > 6) ? "" : "6자 이상 입력해주세요."}
                  variant="outlined"
                  required
                  fullWidth
                  name="EPW"
                  label="비밀번호"
                  type="password"
                  id="EPW"
                  autoComplete="current-password"
                  value = {EPW}
                  onChange={onDataHandler}
                  InputProps={{
                        readOnly : () => { return userbody.CPW ? true : false }
                      }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={hasNotSameError('password')}
                  helperText={(EPW == PWC) ? "" : "현재 비밀번호와 다릅니다."}
                  variant="outlined"
                  required
                  fullWidth
                  name="PWC"
                  label="비밀번호 확인"
                  type="password"
                  id="PWC"
                  autoComplete="current-password"
                  value = {PWC}
                  onChange={onDataHandler}
                  InputProps={{
                        readOnly : () => { return userbody.PWC ? true : false }
                      }}
                  endAdornment={
                    <InputAdornment position="end">
                        <LockOpenIcon /> 
                    </InputAdornment>
                  }
                  
                />
              </Grid>
              <Grid item xs={12} sm={8} />
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