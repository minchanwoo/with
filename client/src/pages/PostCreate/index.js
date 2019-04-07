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
		title: '',
		id: 'new',
	}

	constructor(props) {
		super(props);
		if (props.match && props.match.params.id) {
			this.setState({
				id: props.match.params.id,
			})
			this.loadData(props.match.params.id);
		}
	}

	async loadData(id) {
		const result = await axios.get(`http://localhost:4000/posts/${id}?simple=true`);
		this.setState({
			text: result.data.post.text,
			title: result.data.post.title,
		});
		this.setEditor(this.state.text);
	}

	onSubmit = async () => {
		const body = {
			title: this.state.title,
			text: this.state.text
		}
		const { data: { id } } = await axios.post(`http://localhost:4000/posts/${this.state.id}`, body, { withCredentials: true })
		this.props.history.push(`/posts/${id}`);
	}

	setEditor = (value) => {
		this.editor = new Editor({
			el: document.querySelector('#editor'),
			initialEditType: 'wysiwyg',
			previewStyle: 'vertical',
			initialValue: value,
			hideModeSwitch: true,
			exts: ['colorSyntax'],
			height: '300px',
			events: {
				change: (e) => {
					this.setState({
						text: this.editor.getHtml()
					});
				}
			},
			hooks: {
				addImageBlobHook: async(blob, callback) => {
					const form = new FormData();
					form.append('image', blob);
					const result = await axios.post('http://localhost:4000/posts/image_upload', form);
					callback(result.data.image_url);
				}
			}
		});
	}

	componentDidMount() {
		this.setEditor();
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