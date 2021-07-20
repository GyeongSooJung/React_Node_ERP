import React, { useState, useEffect  } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
      
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={gotosignup}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={all} onChange={handleChange} name="all" value="allowExtraEmails" color="primary" />}
                label="이용약관, 개인정보 수집 및 이용에 모두 동의합니다."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={one} onChange={handleChange} name="one" value="allowExtraEmails" color="primary" required/>}
                label="--- 이용약관 동의"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={two} onChange={handleChange} name="two" value="allowExtraEmails" color="primary" required/>}
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}