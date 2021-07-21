// react, material-ui import
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Container, Stepper, Step, StepLabel, Typography, Link, Button, Divider } from '@material-ui/core';
// 파일 import
import Account from './Account';
import Company from './Company';
import Personal from './Personal';

// Mateiral UI 수정
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  logo: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
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
  colorButton: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
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
  // stepIcon color
  stepIcon: {
    '&$completed': {
        color: "#d32f2f"
    },
    '&$active': {
        color: "#d32f2f"
    },
  },
  completed: {},
  active: {}
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
        return <Personal formParent={{user : user, activeStep : activeStep, signupResult : signupResult}} 
        onChange={value => {
          setUser(value.user);
          setActiveStep(value.activeStep);
          setSignupResult(value.signupResult);
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

  const [user, setUser] = useState(userbody);
  const [activeStep, setActiveStep] = useState(0);
  const [signupResult, setSignupResult] = useState(false);
  

  return (
    <React.Fragment>
      <Container component="main" maxWidth="sm">
      <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.form}>
            <div className={classes.logo}>
              <img src="../../../../images/mk_logo4.png" />
            </div>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map((label) => (
                <Step key={label} style={{iconColor: 'red'}}>
                  <StepLabel StepIconProps={{
                        classes: {
                            root: classes.stepIcon,
                            completed: classes.completed,
                            active: classes.active
                        }
                    }}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ?
                signupResult ?
                  <div>
                    <Typography variant="h5" gutterBottom>
                      회원가입이 완료되었습니다.
                    </Typography>
                    <Typography variant="subtitle1">
                      MK에서 회원가입 승인 후, 웹사이트 이용이 가능합니다.
                    </Typography>
                    <Link href="/signin" underline='none'>
                      <Button
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                      >
                        로그인 페이지로 이동
                      </Button>
                    </Link>
                  </div>
                  : 
                  ""
                : 
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Divider variant="middle" className={classes.hr}/>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/signin" variant="body2" color="textSecondary">
                        이미 가입하셨나요? 로그인 페이지로 이동
                      </Link>
                    </Grid>
                  </Grid>
                </React.Fragment>
              }
            </React.Fragment>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}