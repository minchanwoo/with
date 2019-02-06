import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Menu, Container } from 'semantic-ui-react'

import Axios from 'axios';

class CustomMenu extends Component {
	render() {
		return (
			<Menu.Item active={this.props.to === this.props.pathname}>
				<Link to={this.props.to}>
					<div>{this.props.name}</div>
				</Link>
			</Menu.Item>
		)
	}
}

class NavBar extends Component {
	state = {
		loggedInUser: {
			name: '',
			email: ''
		}
	}

 	fetchUser = async () => {
		const res = await Axios.get('http://localhost:4000/users/info', { withCredentials: true })
		this.setState({loggedInUser: {
			name: res.data.user ? res.data.user.name : '',
			email: res.data.user ? res.data.user.email : '',
		}})
	}

	constructor(props) {
		super(props);
		this.fetchUser();
	}

	async shouldComponentUpdate() {
		await this.fetchUser();
		return true;
	}

	confirmLogout = async () => {
		if (window.confirm('로그아웃 하시겠습니까?')) {
			await Axios.post('http://localhost:4000/users/logout', {}, { withCredentials: true })
			await this.fetchUser();
			this.props.history.push('/');
		}
	}

	render() {
		const pathname = this.props.location.pathname;
		const menues = (this.state.loggedInUser.email) 
			? [ {to: '/', name: 'Home' }, {to: '/mypage', name: 'MyPage'} ]
			: [ {to: '/', name: 'Home' }, {to: '/login', name: 'Login'}, {to: '/join', name: 'Join'} ]
		return (
			<Menu fixed='top' inverted>
				<Container>
					{menues.map((menu, i) => (
						<CustomMenu 
							key={i}
							to={menu.to} 
							name={menu.name} 
							pathname={pathname} />
						))}
					{this.state.loggedInUser.name ?
						[
							<Menu.Item key={0} onClick={() => this.confirmLogout()}>Logout</Menu.Item>,
							<Menu.Item key={1}>{this.state.loggedInUser.name}님 안녕하세요</Menu.Item>
						]
						: <Menu.Item>회원가입 해주세요.</Menu.Item>
					}
				</Container>
			</Menu>
		)
	}
}

export default withRouter(NavBar);