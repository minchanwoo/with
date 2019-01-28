import React, { Component } from 'react';
import axios from 'axios';

class Join extends Component {
	state = {
		name: '',
		nick: '',
		password: '',
		errorMessage: '',
	}

	handleSubmit = (e) => {
		e.preventDefault();
		
		const body = {
			name: this.state.name,
			nick: this.state.nick,
			password: this.state.password,
			email: this.state.email,
			password_confirm: this.state.password_confirm,
		};

		if (!/^([a-z0-9A-Z_]+)@(naver|gmail)\.com$/.test(body.email)) {
			this.setState({
				errorMessage: 'naver.com 나 gmail.com 으로만 가입 가능합니다.'
			});
		} else if (!/^[a-z0-9A-Z]{8,16}$/.test(body.password)) {
			this.setState({
				errorMessage: '비밀번호는 8자 이상, 16자 이하여야 합니다.'
			});
		} else if (!/[a-z]+/.test(body.password) || !/[A-Z]+/.test(body.password) || !/[0-9]+/.test(body.password)) {
			this.setState({
				errorMessage: '비밀번호에는 영문 대문자, 영문 소문자, 숫자가 각각 1글자 이상 포함되어야 합니다.'
			});
		} else if (body.password !== body.password_confirm) {
			this.setState({
				errorMessage: '비밀번호와 비밀번호 확인값이 다릅니다.'
			});
		} else {
			axios.post('http://localhost:4000/users/join', body)
			.then((result) => {
				this.setState({
					errorMessage: ''
				});
			})
			.catch((catchedError) => {
				console.log(catchedError);
				this.setState({
					errorMessage: catchedError.response.data.errorMessage
				});
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
				<form onSubmit={this.handleSubmit}>
					<input
						type='text'
						name='name'
						placeholder='이름'
						onInput={this.handleInput}
					/>
					<br/>
					<input
						type='email'
						name='email'
						placeholder='이메일'
						onInput={this.handleInput}
					/>
					<br/>
					<input
						type='text'
						name='nick'
						placeholder='닉네임'
						onInput={this.handleInput}
					/>
					<br/>
					<input
						type='password'
						name='password'
						placeholder='비밀번호'
						onInput={this.handleInput}
					/>
					<br/>
					<input
						type='password'
						name='password_confirm'
						placeholder='비밀번호 확인'
						onInput={this.handleInput}
					/>
					<br/>
					<button type='submit'>회원가입</button>
					<div style={{color: 'red'}}>
						{this.state.errorMessage}
					</div>
				</form>
			</div>
		);
	}
}

export default Join;