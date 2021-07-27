import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

// 네브바는 useEffect를 사용한 ajax
// 랜딩페이지는 fetch를 사용한 ajax

import SigninPage from './components/views/SigninPage/SigninPage';
import SignupConfirm from './components/views/CompanySignupPage/SignupConfirm';
import SignupPage from './components/views/CompanySignupPage/Checkout';
import SignupAddress from './components/views/CompanySignupPage/Address';
import FindAccountPage from './components/views/FindAccountPage/FindAccountPage';
import DashboardPage from './components/views/DashboardPage/Dashboard';
import listtestPage from './components/views/DashboardPage/Menu/listTest';

export default function BasicExample() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={SigninPage} />
          <Route exact path="/signin" component={SigninPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/signupconfirm" component={SignupConfirm} />
          <Route exact path="/address" component={SignupAddress} />
          <Route exact path="/findaccount" component={FindAccountPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/listtest" component={listtestPage} />
          
        </Switch>
      </div>
    </Router>
  );
}
