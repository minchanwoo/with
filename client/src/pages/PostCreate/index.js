import React, { Component } from 'react';

import axios from 'axios';

import { Input, Button } from 'semantic-ui-react'

import Editor from 'tui-editor';
import 'tui-editor/dist/tui-editor-extColorSyntax';

import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.css';
import 'tui-editor/dist/tui-editor-contents.css';
import 'highlight.js/styles/github.css';

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

	componentDidMount() {
		this.editor = new Editor({
			el: document.querySelector('#editor'),
			initialEditType: 'wysiwyg',
			previewStyle: 'vertical',
			hideModeSwitch: true,
			exts: ['colorSyntax'],
			height: '300px',
			events: {
				change: (e) => {
					this.setState({
						text: this.editor.getHtml()
					});
				}
			}
		});
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
				<div id='editor' />
			</div>
		);
	}
}

export default PostEdit;