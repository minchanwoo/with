import React, { Component } from 'react';
import axios from 'axios';

import { Button, Header, Input } from 'semantic-ui-react'

import { bodyValidator } from '../../utils/validator';

class Join extends Component {
	state = {
		name: '',
		nick: '',
		password: '',
		errorMessage: '',
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		
		const body = {
			name: this.state.name,
			nick: this.state.nick,
			password: this.state.password,
			email: this.state.email,
			password_confirm: this.state.password_confirm,
		};

		try {
			bodyValidator(body);
			await axios.post('http://localhost:4000/users/join', body)
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
				<Header as='h2'>회원가입</Header>
				<form onSubmit={this.handleSubmit}>
					<Input
						type='text'
						name='name'
						placeholder='이름'
						onInput={this.handleInput}
					/>
					<br/>
					<Input
						type='email'
						name='email'
						placeholder='이메일'
						onInput={this.handleInput}
					/>
					<br/>
					<Input
						type='text'
						name='nick'
						placeholder='닉네임'
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
					<Input
						type='password'
						name='password_confirm'
						placeholder='비밀번호 확인'
						onInput={this.handleInput}
					/>
					<br/>
					<Button type='submit'>회원가입</Button>
					<div style={{color: 'red'}}>
						{this.state.errorMessage}
					</div>
				</form>
			</div>
		);
	}
}

export default Join;