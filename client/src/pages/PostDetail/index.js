import React, { Component } from 'react'
import axios from 'axios';

import { Button, Confirm, Message, Icon, Comment, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import dateFns from 'date-fns';

import styles from './index.scss';
import Axios from 'axios';

import Viewer from 'tui-editor/dist/tui-editor-Viewer';

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            text: '',
            is_my_post: false,
            openDelete: false,
            openLogin: false,
            id: 0,
            like_result: '',
            liked_users: [],
            comments: [],
            loggedInUser: props.loggedInUser,
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
        const comments = result.data.post.comments;
        const liked_users = result.data.post.likes.map((like) => like.user);
        
        this.setState({
            id,
            title: result.data.post.title,
            text: result.data.post.text,
            is_my_post: result.data.is_my_post,
            liked_users,
            comments,
        })

        new Viewer({
            el: document.querySelector('#viewer'),
            height: '300px',
            initialValue: this.state.text,
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

    like = async() => {
        try {
            const result = await axios.post(`http://localhost:4000/likes/${this.state.id}`, {}, { withCredentials: true });
            let liked_users = this.state.liked_users;
            let like_result = '';
            if (result.data.result === 'ADDED') {
                liked_users = liked_users.concat(result.data.user);
                like_result = '좋아요가 추가되었습니다.';
            } else if (result.data.result === 'DELETED') {
                liked_users = liked_users.filter((user) => {
                    return user.id !== result.data.user.id;
                })
                like_result = '좋아요가 취소되었습니다.';

            }
            this.setState({
                like_result,
                liked_users,
            });
            setTimeout(() => {
                this.setState({
                    like_result: ''
                })
            }, 3000);
        } catch(e) {
            alert(e.response.data);
        }
    }

    onInputComment = async (e) => {
        const target = e.target;
        if (e.key === 'Enter') {
            console.log('ENTER!!', e.target.value);
            const result = await Axios.post(`http://localhost:4000/posts/${this.state.id}/comments`, { text: e.target.value }, { withCredentials: true});
            const new_comment = {
                id: result.data.result.id,
                user: {
                    name: result.data.user_name,
                },
                createdAt: result.data.result.createdAt,
                text: result.data.result.text,
            };
            const comments = this.state.comments;
            comments.push(new_comment);
            this.setState({
                comments,
            });
            target.value = '';
        }
    }

    render() {
        const { title, is_my_post, like_result, loggedInUser } = this.state;
        return (
            <div className={styles.detail}>
                <div className={styles.title}>{title}</div>
                <div id='viewer' />

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
                {loggedInUser && loggedInUser.name
                    ? <Icon name='like' onClick={() => this.like()} style={{cursor: 'pointer'}}/>
                    : <Icon name='like' onClick={() => this.setState({ openLogin: true })} style={{cursor: 'pointer'}}/> }

                <Confirm 
                    open={this.state.openLogin} 
                    content='로그인 하시겠습니까?'
                    confirmButton='로그인 창 이동'
                    cancelButton='취소'
                    onCancel={() => this.setState({ openLogin: false })}
                    onConfirm={() => this.props.history.push('/login')}
                />
                
                {this.state.liked_users.map((user, i) => {
                    return <span key={user.id}>
                        <Link to={`/user/${user.id}`}>{user.name}</Link>
                        {i !== this.state.liked_users.length - 1 && ', '}
                    </span>
                })}
                {like_result && <Message info><p>{like_result}</p></Message>}

                <Comment.Group>
                    {this.state.comments.map((comment) => {
                        return <Comment key={comment.id}>
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.user.name}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{dateFns.format(comment.createdAt, 'YY/MM/DD hh:mm a')}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.text}</Comment.Text>
                            </Comment.Content>
                        </Comment>;
                    })}
                    <Form reply>
                        <Form.Input onKeyPress={(e) => this.onInputComment(e)} />
                    </Form>

                </Comment.Group>
            </div>
        )
    }
}

export default PostDetail;