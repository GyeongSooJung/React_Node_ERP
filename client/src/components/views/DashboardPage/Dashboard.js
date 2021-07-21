import React, { useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';


import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { useHistory } from "react-router-dom"; // 로그인 안되었을 때
import { useCookies } from "react-cookie";

import Orders from './Orders'
import Chart from './Chart'
import Deposits from './Deposits'
import BusinessComponent from './Menu/BusinessComponent'
import ItemComponent from './Menu/ItemComponent'


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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const [cookies, setCookie, removeCookie] = useCookies(['isLogined']);
  const history = useHistory();
  useEffect(() => {
    if(cookies.isLogined == undefined){
      history.push('/')
    }
  },[]);
  
  let [activeStep,setActiveStep] = useState("");
  
  const classes = useStyles();
  const [menuopen, setOpen] = React.useState(true);
  const [menulistOpen, setMenulistOpen] = useState("");
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const getDashboardContent = (step) => {
    // console.log("step : " + step)
    switch (step) {
      case "대시 보드" :
        return <Deposits />;
      case "회계" :
        return <Orders />;
      case "거래처" :
        return <BusinessComponent formParent={{name : "Business"}} />;
      case "품목" :
        return <ItemComponent />;
      case "재고관리" :
        return <Orders />;
      case "구매관리" :
        return <Orders />;
      case "판매관리" :
        return <Orders />;
      case "계정관리" :
        return <Orders />;
      case "이용약관" :
        return <Orders />;
      default :
        return <Deposits />;
    }
    
  }
  
  const onMenulistHandler = (event) => {
    switch (event.target.innerHTML) {
      case "대시 보드" :
        setActiveStep("대시 보드");
        break;
        
      case "기초 등록" : 
        if(menulistOpen == "기초 등록")
          setMenulistOpen("");
        else
          setMenulistOpen("기초 등록");
        break;
      case "영업" : 
        if(menulistOpen == "영업")
          setMenulistOpen("");
        else
          setMenulistOpen("영업");
        break;
      case "회계" : 
        setActiveStep("회계");
        if(menulistOpen == "회계")
          setMenulistOpen("");
        else
          setMenulistOpen("회계");
        break;
      case "마이페이지" : 
        if(menulistOpen == "마이페이지")
          setMenulistOpen("");
        else
          setMenulistOpen("마이페이지");
        break;
        
      case  "거래처" :
        setActiveStep("거래처");
        break;
      case  "품목" :
        setActiveStep("품목");
        break;
      case  "재고관리" :
        setActiveStep("재고관리");
        break;
      case  "구매관리" :
        setActiveStep("구매관리");
        break;
      case  "판매관리" :
        setActiveStep("판매관리");
        break;
      case  "계정관리" :
        setActiveStep("계정관리");
        break;
      case  "이용약관" :
        setActiveStep("이용약관");
        break;
        
        
      default :
        break;
    }
  }
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, menuopen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, menuopen && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {activeStep}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !menuopen && classes.drawerPaperClose),
        }}
        open={menuopen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
          button
          onClick={onMenulistHandler}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="기초 등록" />
            {(menulistOpen == "기초 등록") ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {(menulistOpen == "기초 등록") ? 
            <List>
              <ListItem
              button
              onClick={onMenulistHandler}>
                <ListItemText primary="거래처" />
              </ListItem>
              <ListItem
              button
              onClick={onMenulistHandler}>
                <ListItemText primary="품목" />
              </ListItem>
            </List>
            :
            ""
          }
          <ListItem button
          onClick={onMenulistHandler}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="영업" />
            {(menulistOpen == "영업") ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {(menulistOpen == "영업") ? 
            <List>
              <ListItem
              button
              onClick={onMenulistHandler}>
                <ListItemText primary="재고관리" />
              </ListItem>
              <ListItem
              button
              onClick={onMenulistHandler}>
                <ListItemText primary="구매관리" />
              </ListItem>
              <ListItem
              button
              onClick={onMenulistHandler}>
                <ListItemText primary="판매관리" />
              </ListItem>
            </List>
            :
            ""
          }
          <ListItem button
          onClick={onMenulistHandler}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="회계" />
            {(menulistOpen == "회계") ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <ListItem button
          onClick={onMenulistHandler}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="마이페이지" />
            {(menulistOpen == "마이페이지") ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {(menulistOpen == "마이페이지") ? 
            <List>
              <ListItem>
                <ListItemText primary="계정관리" />
              </ListItem>
              <ListItem>
                <ListItemText primary="이용약관" />
              </ListItem>
            </List>
            :
            ""
          }
          <ListItem button
          onClick={onMenulistHandler}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="대시 보드" />
            {(menulistOpen == "대시 보드") ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {getDashboardContent(activeStep)}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}