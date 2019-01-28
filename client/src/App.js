import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './pages/Join';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/join" component={Join} />
        </div>
      </Router>
    )
  }
}

export default App;
