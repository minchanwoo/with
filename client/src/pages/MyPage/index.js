import React, { Component } from 'react';
import Axios from 'axios';

import { Input, Button, Table } from 'semantic-ui-react'

import { withRouter, Link } from 'react-router-dom';

class MyPage extends Component {
	state = {
		email: '',
		name: '',
		nick: '',
		posts: [],
		likes: [],
	};

	constructor(props) {
		super(props);
		this.fetchUser();
	}

	fetchUser = async () => {
		const {data: { user }} = (await Axios.get('http://localhost:4000/users/mypage', { withCredentials: true }));
		if (!user) {
			this.props.history.push('/login');
		}
		this.setState({
			email: user.email,
			name: user.name,
			nick: user.nick,
			posts: user.posts,
			likes: user.likes,
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
		await Axios.post(`http://localhost:4000/users/update`, body, { withCredentials: true });
	}

	handleDelete = async (e) => {
		e.preventDefault();
		if(window.confirm('정말 탈퇴하시겠습니까?')) {
			await Axios.post('http://localhost:4000/users/delete', {}, { withCredentials: true });
			this.props.history.push('/');
		}
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
					<Button onClick={this.handleDelete}>탈퇴</Button>
				</form>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan={2}>내가 쓴 글</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.state.posts.map((post) => {
							return <Table.Row key={post.id}>
								<Table.Cell><Link to={`/posts/${post.id}`} >{post.title}</Link></Table.Cell>
								<Table.Cell>{post.createdAt}</Table.Cell>
							</Table.Row>
						})}
					</Table.Body>
				</Table>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell colSpan={3}>내가 좋아요 글</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.state.likes.map((like) => {
							return <Table.Row key={like.id}>
								<Table.Cell><Link to={`/posts/${like.post.id}`} >{like.post.title}</Link></Table.Cell>
								<Table.Cell>{like.post.user.name}</Table.Cell>
								<Table.Cell>{like.post.createdAt}</Table.Cell>
							</Table.Row>
						})}
					</Table.Body>
				</Table>
			</div>
			
		);
	}
}

export default withRouter(MyPage);