import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css'

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Logout from './pages/Logout';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div style={{marginTop: '60px'}}>
            <Route path="/" exact component={Home} />
            <Route path="/join" component={Join} />
            <Route path="/login" component={Login} />
            <Route path="/mypage" component={MyPage} />
            <Route path="/logout" component={Logout} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
