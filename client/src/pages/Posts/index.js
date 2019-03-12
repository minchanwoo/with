import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Axios from 'axios';

import { Pagination, Table, Button, Dropdown } from 'semantic-ui-react'

const ITEMS_PER_PAGE_OPTIONS = ['3', '5', '7', '10'].map((count) => ({ key: count, value: count, text: count+'개씩 보기'}));

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
        items_per_page: 10,
    }

    constructor(props) {
        super(props);
        this.loadInfo(this.state.currentPage, this.state.items_per_page);
    }

    loadInfo = async (page, items_per_page) => {
        const {data: { posts, total_page }} = await Axios.get(`http://localhost:4000/posts`, {params: {page, items_per_page}});
        this.setState({
            posts,
            total_page,
            currentPage: page,
            items_per_page,
        })
    }

    render() {
        return (
            <div style={{ padding: 20 }}>
                <Dropdown
                    placeholder='N개씩 보기'
                    search
                    selection
                    options={ITEMS_PER_PAGE_OPTIONS} 
                    onChange={(e, data) => this.loadInfo(1, data.value)}/>
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
                        onPageChange={(e, data) => this.loadInfo(data.activePage, this.state.items_per_page)} />
                    <Link to='/new_post'><Button primary floated='right'>추가</Button></Link>
                </div>
            </div>
        );
    }
}

export default Posts;