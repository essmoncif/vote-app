import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Settings from './components/Settings.security';


function App() {
  return (
    <div >
      <header>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Login} exact></Route>
            <Route path='/profile' component={Profile}></Route>
            <Route path='/settings' component={Settings} ></Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
