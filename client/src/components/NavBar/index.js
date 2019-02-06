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

	fetchUser = () => {
		Axios.get('http://localhost:4000/users/info', { withCredentials: true })
			.then((res) => {
				this.setState({loggedInUser: {
					name: res.data.user ? res.data.user.name : '',
					email: res.data.user ? res.data.user.email : '',
				}})
			});
	}

	constructor(props) {
		super(props);
		this.fetchUser();
	}

	componentWillReceiveProps() {
		this.fetchUser();
	}

	render() {
		const pathname = this.props.location.pathname;
		const menues = (this.state.loggedInUser.email) 
			? [ {to: '/', name: 'Home', exact: true}, {to: '/mypage', name: 'MyPage'}, {to: '/logout', name: 'Logout'} ]
			: [ {to: '/', name: 'Home', exact: true}, {to: '/login', name: 'Login'}, {to: '/join', name: 'Join'} ]
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
					<Menu.Item>
						{this.state.loggedInUser.name 
							? `${this.state.loggedInUser.name}님 안녕하세요.` 
							: '회원가입 해주세요.'
						}
					</Menu.Item>
				</Container>
			</Menu>
		)
	}
}

export default withRouter(NavBar);