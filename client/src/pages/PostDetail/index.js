import React, { Component } from 'react'
import axios from 'axios';

import marked from 'marked';

import { Button, Header, Input } from 'semantic-ui-react'

import styles from './index.scss';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            is_my_post: false,
        };
        this.getData();
    }

    async componentWillReceiveProps() {
        await this.getData();
    }

    getData = async () => {
        const id = this.props.match.params.id;
        const result = await axios.get(`http://localhost:4000/posts/${id}`, { withCredentials: true });
        
        this.setState({
            title: result.data.post.title,
            text: result.data.post.text,
            is_my_post: result.data.is_my_post,
        })
    }

    render() {
        const { title, text, is_my_post } = this.state;
        return (
            <div className={styles.detail}>
                <div className={styles.title}>{title}</div>
                <div className={styles.body} dangerouslySetInnerHTML={{__html: marked(text)}} />

                {is_my_post && <div className={styles.buttons}>
                    <Button>수정</Button>
                    <Button>삭제</Button>
                </div>}
            </div>
        )
    }
}

export default PostDetail;