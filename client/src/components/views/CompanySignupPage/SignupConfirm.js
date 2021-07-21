import React, { useState, useEffect  } from 'react';
import { Button, CssBaseline, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    margin: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  // custom checkbox style
  customCheckboxStyle: {
    '&$checked': {
      color: '#d32f2f',
    },
  },
  checked: {}
}));


export default function SignUpConfirm(props) {
    const classes = useStyles();
    const history = useHistory();
    
    const checkinit = {
        all : false,
        one: false,
        two: false,
    }
    
    let [state, setState] = useState(checkinit);
    let { all, one, two } = state;
    
    const handleChange = (event) => {
        setState({...state, [event.target.name] : event.target.checked})
    }
    
    useEffect(()=> {
        if(state.all == true) {
            
            setState({
                all : true,
                one: true,
                two: true,
            });
        }
        else {
            // setState({all : false, one : false, two : false});
            
            setState({
                all : false,
                one: false,
                two: false,
            });
        }
    }, [state.all])
    
    const gotosignup = () => {
        history.push('/signup');
    }
    
    

  return (
      
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.logo}>
          <img src="../../../../images/mk_logo4.png" />
        </div>
        <form className={classes.form} onSubmit={gotosignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={all} onChange={handleChange} name="all" value="allowExtraEmails" classes={{
                        root: classes.customCheckboxStyle,
                        checked: classes.checked
                }} />}
                label="이용약관, 개인정보 수집 및 이용에 모두 동의합니다."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={one} onChange={handleChange} name="all" value="allowExtraEmails" classes={{
                        root: classes.customCheckboxStyle,
                        checked: classes.checked
                }} />}
                label="--- 이용약관 동의"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={two} onChange={handleChange} name="all" value="allowExtraEmails" classes={{
                        root: classes.customCheckboxStyle,
                        checked: classes.checked
                }} />}
                label="개인정보 수집 및 이용 동의"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            확인
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2" color="textSecondary">
                이미 가입하셨나요? 로그인 페이지로 이동
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}