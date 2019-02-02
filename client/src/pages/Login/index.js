import React, { Component } from 'react';

import { Button, Header, Input } from 'semantic-ui-react'
import Axios from 'axios';

import { bodyValidator } from '../../utils/validator';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errorMessage: ''
	}

	handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			email: this.state.email,
			password: this.state.password,
		}

		try {
			bodyValidator(body);
			await Axios.post('http://localhost:4000/users/login', body)
			this.props.history.push('/');
		} catch (catchedError) {
			const errorMessage = (catchedError.response && catchedError.response.data) 
				? catchedError.response.data.errorMessage
				: catchedError.message;
			this.setState({
				errorMessage
			});
		}
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<div>
				<Header as='h2'>로그인</Header>
				<form onSubmit={this.handleSubmit}>
					<Input
						type='email'
						name='email'
						placeholder='이메일'
						onInput={this.handleInput}
					/>
					<br/>
					<Input
						type='password'
						name='password'
						placeholder='비밀번호'
						onInput={this.handleInput}
					/>
					<br/>
					<Button type='submit'>로그인</Button>
					<div style={{color: 'red'}}>
						{this.state.errorMessage}
					</div>
				</form>
			</div>
		);
	}
}

export default Login;