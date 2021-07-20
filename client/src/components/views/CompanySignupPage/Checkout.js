import React, { useState, useEffect  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';

import Account from './Account';
import Company from './Company';
import Personal from './Personal';

import { useHistory } from "react-router-dom";

//dispatch
import Axios from 'axios'

  // 회원가입
import {signupCompany} from '../../../_actions/user_action';
import {useDispatch} from 'react-redux';

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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));





export default function Checkout() {
  const steps = ['계정 정보', '사업자 정보', '개인 정보'];
  const classes = useStyles();

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Account formParent={{user : user, activeStep : activeStep}}
        onChange={value => {
          setUser(value.user);
          setActiveStep(value.activeStep);
        }}/>;
      case 1:
        return <Company formParent={{user : user, activeStep : activeStep}} 
        onChange={value => {
          setUser(value.user);
          setActiveStep(value.activeStep);
        }}/>;
      case 2:
        return <Personal formParent={{user : user, activeStep : activeStep}} 
        onChange={value => {
          setUser(value.user);
          setActiveStep(value.activeStep);
        }}/>;
      default:
        throw new Error('Unknown step');
    }
  }
  
  let userbody = { // 유저에 관한 내용들 
      EID : "",
      EPW : "",
      ENA : "",
      EAD : "",
      EAD2 : "",
      EPH : "",
      EEM : "",
      PWC : "",
      CNA : "",
      CNU : "",
      CAD : "",
      CAD2 : "",
      CEON : "",
      CEOP : "",
      CTEL : "",
      CFAX : "",
      CEM : "",
      IDcheck : false,
      CNUcheck : "",
      authNum : "",
  }

  let [user, setUser] = useState(userbody)
  let [activeStep, setActiveStep] = useState(0)
  
  const history = useHistory();
  
  const dispatch = useDispatch();
  
  const signup = () => {
        
      dispatch(signupCompany(user))
      .then(response => {
        if(response.payload.result == true) {
          alert("회원가입이 완료되었습니다! 로그인을 해주세요")
          history.push('/signin')
        }
        
        else {
          alert("회원가입에 실패하였습니다 다시시도해주세요")
        }
      })
        
  }
  

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            MK
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Sign up
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
            <div>
                {signup()}
            </div>
                
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}