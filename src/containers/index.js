import React, { Component, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Loading from "../helper/loading.js";

import {
  HashRouter as Router,
  withRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Login = lazy(() => import("../Login"));
const Interface = lazy(() => import("./interface/Index"));
const Source = lazy(() => import("./source/Index"));
const Third = lazy(() => import("./system/Third"));
const User = lazy(() => import("./system/User"));

const requireAuth = (nextState, replace, next) => {
  // 切换路由时初始化环境
  if (process.env.NODE_ENV === "development") {
    // 本地调试环境不进行auth
    next();
    return;
  } else {
    // next();
    // return;
    let dbs_token = sessionStorage.getItem("dbsys_token");
    if (dbs_token) {
      next();
      return;
    } else {
      //跳转登录
      this.router.push("/login");
    }
    // sessionStorage.setItem("dbsys_token", "value");
  }
};
const HomeApp = () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/" component={Interface} onEnter={requireAuth} />
        <Route exact path="/interface" component={Interface} />
        <Route exact path="/source" component={Source} />
        <Route exact path="/third" component={Third} />
        <Route exact path="/user" component={User} />
        <Route exact path="/login" component={Login} />
      </Switch>
      {/* <Switch>
      <Route exact path='/develop/taskmanage' component={TaskManagedevelop}/>
      <Route exact path='/develop/detail/:id' component={Detaildevelop}/>
      <Route exact path='/develop/addtask/:id' component={Adddevelop}/>
      <Route exact path='/develop/tasktype' component={Typelistdevelop}/>
      <Route exact path='/develop/addtype/:id' component={Addtypedevelop}/>
    </Switch> */}
    </Suspense>
  </Router>
);
export default HomeApp;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
