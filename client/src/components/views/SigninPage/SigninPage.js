import React, { useState } from 'react';
import { Button, CssBaseline, TextField, Link, Grid, Container, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//리덕스
import {useDispatch} from 'react-redux';
import {signinUser} from '../../../_actions/user_action';

//쿠키 사용
import { useCookies } from "react-cookie";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  basic: {
    margin: theme.spacing(3, 3, 3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5, 0, 1.5),
    backgroundColor: '#d32f2f',
    color: 'white',
    
    '&:hover': {
        backgroundColor: '#b52626',
        color: '#f5f5f5'
    }
  },
  hr: {
    margin: theme.spacing(3, 0, 3)
  },
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
  // custom checkbox style
  customCheckboxStyle: {
    '&$checked': {
      color: '#d32f2f',
    },
  },
  checked: {},
  // custom dropdown style
  customDropdown: {
    padding: theme.spacing(0, 4),
    textAlign: 'center'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [cookies, setCookie, removeCookie] = useCookies(['isLogined']);
  
  //드롭다운 컨트롤
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key == 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  
  let loginbody = {
    CNU : "",
    EID : "",
    EPW : "",
  };
  
  
  let [loginUser, setLoginUser] = useState(loginbody);
  
  let { CNU, EID, EPW} = loginUser; 
  
  const onDataHandler = (event) => {
    setLoginUser({...loginUser, [event.target.name] : event.target.value});
  };
  
  const onLoginHandler = (event) => {
    event.preventDefault();
    
    dispatch(signinUser(loginUser))
    .then(response => {
      if(response.payload.result == true) {
        setCookie('isLogined',response.payload.isLogined,{path: '/', expires: new Date(Date.now()+86400000)});
        alert('로그인 성공!');
        history.push('/dashboard');
      }
      else {
        alert('로그인 실패!');
      }
    });
  };
  
  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}>
          <img src="../../../../images/mk_logo4.png" />
        </div>
        <form className={classes.form} onSubmit = {onLoginHandler} >
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="CNU"
            label="사업자 등록번호"
            name="CNU"
            autoComplete="CNU"
            autoFocus
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="EID"
            label="아이디"
            name="EID"
            autoComplete="EID"
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
          />
          <TextField
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
            value={EPW}
            onChange={onDataHandler}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="textSecondary">
                비밀번호를 잊으셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link
                style={{cursor: 'pointer'}}
                ref={anchorRef}
                variant="body2"
                color="textSecondary"
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                회원가입 페이지로 이동
              </Link>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement == 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem onClick={handleClose}>
                            <Link href="/signupconfirm?kind=company" variant="body2" color="textSecondary" className={classes.customDropdown}>
                              {"사업주"}
                            </Link>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <Link href="/signupconfirm?kind=employee" variant="body2" color="textSecondary" className={classes.customDropdown}>
                              {"직원"}
                            </Link>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}