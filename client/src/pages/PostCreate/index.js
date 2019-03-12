import React, { Component } from 'react';

import marked from 'marked';
import CodeMirror from 'react-codemirror';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

import styles from './index.scss';

import { Input, Button } from 'semantic-ui-react'

class PostEdit extends Component {
	state = {
		text: '',
		title: ''
	}

	onSubmit = async () => {
		const haha = {
			title: this.state.title,
			text: this.state.text
		}
		const { data: { id } } = await axios.post('http://localhost:4000/posts/new', haha, { withCredentials: true })
		this.props.history.push(`/posts/${id}`);
	}
	
	render() {
		return (
			<div style={{padding:'20px'}}>
				<Input
					type='text'
					onChange={(e)=> this.setState({ title: e.target.value })} 
					value={this.state.title} 
					placeholder='제목을 입력해주세요'
				/>
				<Button onClick={()=> this.onSubmit()} color='teal'>등록</Button>
				<div className={styles.root}>
					<CodeMirror value={this.state.text} onChange={(value) => this.setState({ text: value})} />
					<div className={styles.preview} dangerouslySetInnerHTML={{__html: (marked(this.state.text))}} />
				</div>
			</div>
		);
	}
}

export default PostEdit;