import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import createBrowserHistory from "history/createBrowserHistory";

import 'semantic-ui-css/semantic.min.css'

import Axios from 'axios';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import MyPage from './pages/MyPage';

const history = createBrowserHistory()

class App extends Component {
  state = {
		loggedInUser: {
			name: '',
			email: ''
		}
	}

 	fetchUser = async () => {
    const fetched_user = (await Axios.get('http://localhost:4000/users/info', { withCredentials: true })).data.user;

    if (!fetched_user) {
      return;
    }

    if ((fetched_user.name !== this.state.loggedInUser.name) || (fetched_user.email !== this.state.loggedInUser.email)) {
      this.setState({
        loggedInUser: {
          name: fetched_user.name,
          email: fetched_user.email,
        }
      });
    }
  }

	constructor(props) {
		super(props);
		this.fetchUser();
  }
  
  render() {
    return (
      <Router history={history}>
        <div>
          <NavBar 
            loggedInUser={this.state.loggedInUser} 
            fetchUser={this.fetchUser}
          />
          <div style={{marginTop: '60px'}}>
            <Route path="/" exact component={Home} />
            {this.state.loggedInUser.name ? (
              <Route path="/mypage" component={MyPage} />
            ): (
              <div>
                <Route path="/join" component={Join} />
                <Route path="/login" component={Login} />
              </div>
            )}
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
