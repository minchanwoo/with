import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
          <Route path="/" exact component={Home} />
          <Route path="/join" component={Join} />
          <Route path="/login" component={Login} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/logout" component={Logout} />
        </div>
      </Router>
    )
  }
}

export default App;
