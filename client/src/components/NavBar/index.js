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
	async shouldComponentUpdate() {
		await this.props.fetchUser();
		return true;
	}

	confirmLogout = async () => {
		if (window.confirm('로그아웃 하시겠습니까?')) {
			await Axios.post('http://localhost:4000/users/logout', {}, { withCredentials: true })
			await this.props.fetchUser();
			this.props.history.push('/');
		}
	}

	render() {
		const pathname = this.props.location.pathname;
		const common_menues = [{to: '/', name: 'Home' }, {to: '/posts', name: 'Posts'}]
		const menues = (this.props.loggedInUser.email) 
			? common_menues.concat([{to: '/mypage', name: 'MyPage'}])
			: common_menues.concat([{to: '/login', name: 'Login'}, {to: '/join', name: 'Join'}]);
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
					{this.props.loggedInUser.name ?
						[
							<Menu.Item key={0} onClick={this.confirmLogout}>Logout</Menu.Item>,
							<Menu.Item key={1}>{this.props.loggedInUser.name}님 안녕하세요</Menu.Item>
						]
						: <Menu.Item>회원가입 해주세요.</Menu.Item>
					}
				</Container>
			</Menu>
		)
	}
}

export default withRouter(NavBar);