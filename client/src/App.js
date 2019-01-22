import React, { Component } from 'react';

import axios from 'axios';

class App extends Component {
  state = {
    name: '',
    nick: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const body = {
      name: this.state.name,
      nick: this.state.nick,
      password: this.state.password
    };

    axios.post('http://localhost:4000/users/join', body)
      .then((result) => console.log(result));
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='이름'
            onInput={this.handleInput}
          />
          <input
            type='text'
            name='nick'
            placeholder='닉네임'
            onInput={this.handleInput}
          />
          <input
            type='password'
            name='password'
            placeholder='비밀번호'
            onInput={this.handleInput}
          />
          <button type='submit'>회원가입</button>
        </form>
      </div>
    );
  }
}

export default App;
