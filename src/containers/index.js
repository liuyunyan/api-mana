import React, { Component, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../helper/loading.js'

import { HashRouter as Router, withRouter,Switch,Route } from 'react-router-dom';

const Source = lazy(() => import('./source/Index'))
const Third = lazy(() => import('./system/Third'))
const User = lazy(() => import('./system/User'))

const HomeApp = () => (
    <Router>
    <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path='/' component={Source}/>
      <Route exact path='/source' component={Source}/>
      <Route exact path='/third' component={Third}/>
      <Route exact path='/user' component={User}/>
      
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
