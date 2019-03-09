import React, { Component } from 'react';

import marked from 'marked';
import CodeMirror from 'react-codemirror';
import axios from 'axios';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

import styles from './index.scss';

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
		const result = await axios.post('http://localhost:4000/posts/new', haha, { withCredentials: true })
	}
	
	render() {
		return (
			<div>
				<div className={styles.title}>제목</div>
				<input type='text' onChange={(e)=> this.setState({ title: e.target.value })} value={this.state.title} />
				<button onClick={()=> this.onSubmit()}>등록</button>
				<div className={styles.root}>
					<div className={styles.textarea}>
						<CodeMirror value={this.state.text} onChange={(value) => this.setState({ text: value})} />
					</div>
					<div className={styles.preview} dangerouslySetInnerHTML={{__html: marked(this.state.text)}}>
					</div>
				</div>
			</div>
		);
	}
}

export default PostEdit;