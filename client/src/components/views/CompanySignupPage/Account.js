import React, { useState } from 'react';
import { Grid, Typography, TextField, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// 패스워드 아이콘
import IconButton from '@material-ui/core/IconButton';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InputAdornment from '@material-ui/core/InputAdornment';

//리덕스
import {useDispatch} from 'react-redux';
import {idDupleCheck} from '../../../_actions/user_action';

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
    else if (EPW.length < 8) {
      alert('비밀번호를 8자 이상으로 써주세요.')
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
    if(EID.length != 0) {
      dispatch(idDupleCheck(user))
          .then(response => {
              if(response.payload.result) {
                alert('사용 가능한 아이디입니다.');
                setIDcheck(true);
              } else {
                  alert('중복된 아이디가 존재합니다.');
              }
          })
    }
    else {
      alert('아이디를 입력해주세요.');
    }
  };
        
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        계정 정보
      </Typography>
      <form className={classes.form} onSubmit={onNextHandler}>
        <Grid container>
          <Grid item xs={12} className={classes.verticalCenter}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="EID"
              label="아이디"
              name="EID"
              autoComplete="ID"
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
              value={EID}
              onChange={onDataHandler}
              disabled={IDcheck}
            />
            <Button
              className={classes.formButton}
              onClick={onIDcheckHandler}
              disabled={IDcheck}
              classes={{
                disabled: classes.disabled
              }}
            >
             중복 확인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={(EPW.length != 0) && ((EPW.length) < 8 || (EPW.length) > 16)}
              helperText={(EPW.length != 0) && ((EPW.length) < 8 || (EPW.length) > 16) ? "비밀번호는 8~16자리로 설정해주세요." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="EPW"
              label="비밀번호"
              type="password"
              id="EPW"
              autoComplete="current-password"
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
              value = {EPW}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={(PWC.length != 0) && (EPW != PWC)}
              helperText={(PWC.length != 0) && (EPW != PWC) ? "비밀번호가 서로 다릅니다." : ""}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="PWC"
              label="비밀번호 확인"
              type="password"
              id="PWC"
              autoComplete="current-password"
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
              value = {PWC}
              onChange={onDataHandler}
            />
          </Grid>
          <Grid item xs={12} className={classes.flexRight}>
            <Button
              type="submit"
              variant="contained"
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