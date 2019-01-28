import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Menu, Container } from 'semantic-ui-react'

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
		menues: [
			{to: '/', name:'Home', exact: true},
			{to: '/login', name:'Login'},
			{to: '/mypage', name:'MyPage'},
			{to: '/join', name:'Join'},
			{to: '/logout', name:'Logout'},
		]
	}
	render() {
		const pathname = this.props.location.pathname;
		return (
			<Menu fixed='top' inverted>
				<Container>
					{this.state.menues.map((menu, i) => <CustomMenu key={i} to={menu.to} name={menu.name} pathname={pathname} />)}
				</Container>
			</Menu>
		)
	}
}

export default withRouter(NavBar);