import React, { Component } from 'react';
import Axios from 'axios';

import { Input, Button } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

class MyPage extends Component {
	state = {
		email: '',
		name: '',
		nick: '',
		id: 0
	};

	constructor(props) {
		super(props);
		this.fetchUser();
	}

	fetchUser = async () => {
		const user = (await Axios.get('http://localhost:4000/users/mypage', { withCredentials: true })).data.user;
		if (!user) {
			this.props.history.push('/login');
		}
		this.setState({
			email: user.email,
			name: user.name,
			nick: user.nick,
			id: user.id
		});
	}

	handleInput = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			email: this.state.email,
			name: this.state.name,
			nick: this.state.nick
		};
		await Axios.post(`http://localhost:4000/users/${this.state.id}/update`, body, { withCredentials: true });
	}

	render() {
		return (
			<div>
				<h2>MyPage</h2>
				<form onSubmit={this.handleSubmit}>
					<Input
						type='text'
						name='email'
						placeholder='이메일'
						value={this.state.email}
						onInput={this.handleInput}
					/>
					<br/>
					<Input
						type='text'
						name='name'
						placeholder='이름'
						value={this.state.name}
						onInput={this.handleInput}
					/>
					<br/>
					<Input
						type='text'
						name='nick'
						placeholder='닉네임'
						value={this.state.nick}
						onInput={this.handleInput}
					/>
					<br/><br/><br/>
					<Button>수정</Button>
					<Button>탈퇴</Button>
				</form>
			</div>
			
		);
	}
}

export default withRouter(MyPage);