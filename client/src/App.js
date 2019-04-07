import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import {createBrowserHistory} from "history";

import 'semantic-ui-css/semantic.min.css'

import Axios from 'axios';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import PostCreate from './pages/PostCreate';
import PostDetail from './pages/PostDetail';
import Posts from './pages/Posts';

const history = createBrowserHistory();

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
      this.setState({
        loggedInUser: {
          name: '',
          email: ''
        }
      });
      return;
    } else {
      const email_changed = fetched_user.email === this.state.loggedInUser.email;
      const name_changed = fetched_user.name === this.state.loggedInUser.name;

      if (email_changed && name_changed) {
        return;
      }
        
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
		history.listen(async (location, action) => {
      await this.fetchUser();
    });
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
              <div>
                <Route path="/mypage" component={MyPage} />
                <Route path="/new_post" component={PostCreate} />
              </div>
            ): (
              <div>
                <Route path="/join" component={Join} />
                <Route path="/login" component={Login} />
              </div>
            )}
            <Route path='/posts/:id' component={(props) => <PostDetail {...props} loggedInUser={this.state.loggedInUser} />} />
            <Route exact path='/posts' component={Posts}/>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
