import { makeStyles } from '@material-ui/core/styles';

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

const classes = useStyles();

export default classes