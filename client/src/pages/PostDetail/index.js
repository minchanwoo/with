import React, { Component } from 'react'
import axios from 'axios';

import marked from 'marked';

import { Button, Confirm } from 'semantic-ui-react'

import styles from './index.scss';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            is_my_post: false,
            openDelete: false,
            id: 0,
        };
        this.getData();
    }

    componentDidUpdate(newProps) {
        if (newProps.match.params.id !== this.state.id) {
            this.getData();
        }
    }

    getData = async () => {
        const id = this.props.match.params.id;
        const result = await axios.get(`http://localhost:4000/posts/${id}`, { withCredentials: true });
        
        this.setState({
            id,
            title: result.data.post.title,
            text: result.data.post.text,
            is_my_post: result.data.is_my_post,
        })
    }

    postDelete = async() => {
        const id = this.props.match.params.id;
        try {
            await axios.delete(`http://localhost:4000/posts/${id}`, { withCredentials: true });
            this.props.history.push('/posts');
        } catch (e) {
            alert(e.response.data.errorMessage);
            this.setState({ openDelete: false });
        }
    }

    render() {
        const { title, text, is_my_post } = this.state;
        return (
            <div className={styles.detail}>
                <div className={styles.title}>{title}</div>
                <div className={styles.body} dangerouslySetInnerHTML={{__html: marked(text)}} />

                {is_my_post && <div className={styles.buttons}>
                    <Button>수정</Button>
                    <Button onClick={() => this.setState({ openDelete: true })}>삭제</Button>
                    <Confirm 
                        open={this.state.openDelete} 
                        content='정말 삭제하시겠습니까?'
                        confirmButton='삭제'
                        cancelButton='취소'
                        onCancel={() => this.setState({ openDelete: false })}
                        onConfirm={() => this.postDelete()}
                    />
                </div>}
            </div>
        )
    }
}

export default PostDetail;