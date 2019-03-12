import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import { Pagination, Table, Button } from 'semantic-ui-react'

class Custom extends Component {
    render() {
        return (
            <Table.Row key={this.props.id}>
                <Table.Cell>{this.props.id}</Table.Cell>
                <Table.Cell><Link to={`/posts/${this.props.id}`}>{this.props.title}</Link></Table.Cell>
                <Table.Cell>{this.props.createdAt}</Table.Cell>
                <Table.Cell>{this.props.user.name}</Table.Cell>
            </Table.Row>
        );
    }
}

class Posts extends Component {
    state = {
        posts: [],
        currentPage: 1,
        total_page: 1,
    }

    constructor(props) {
        super(props);
        this.loadInfo(this.state.currentPage);
    }

    loadInfo = async (page) => {
        const {data: { posts, total_page }} = await Axios.get(`http://localhost:4000/posts?page=${page}`)
        this.setState({
            posts,
            total_page,
            currentPage: page
        })
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <Table padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>제목</Table.HeaderCell>
                            <Table.HeaderCell>작성일자</Table.HeaderCell>
                            <Table.HeaderCell>작성자</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.posts.map((post, i) => <Custom key={i} {...post} />)}
                    </Table.Body>
                </Table>
                <div style={{ textAlign: 'center' }}>
                    <Pagination
                        activePage={this.state.currentPage}
                        totalPages={this.state.total_page}
                        onPageChange={(e, data) => this.loadInfo(data.activePage)} />
                    <Link to='/new_post'><Button primary floated='right'>추가</Button></Link>
                </div>
            </div>
        );
    }
}

export default Posts;