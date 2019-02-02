import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import createBrowserHistory from "history/createBrowserHistory";

import 'semantic-ui-css/semantic.min.css'

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Logout from './pages/Logout';

const history = createBrowserHistory()

class App extends Component {
  state = {
    loggedInUser: {
      email: '',
    },
  };

  setLoggedInUser = (user) => {
    this.setState({
      loggedInUser: user
    })
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar loggedInUser={this.state.loggedInUser}/>
          <div style={{marginTop: '60px'}}>
            <Route path="/" exact component={Home} />
            <Route path="/join" component={Join} />
            <Route path="/login" component={() => <Login history={history} setLoggedInUser={this.setLoggedInUser}/>} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/logout" component={Logout} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
