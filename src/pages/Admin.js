import React, { Component } from 'react';

import { Header } from 'semantic-ui-react'

const request = require('superagent');

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers() {
        request
            .get(process.env.REACT_APP_BACKEND + "project/users")
            .withCredentials()
            .then((res) => {
                console.log(res.body)
                this.setState({ users: res.body })
            })
    }

    render() {
        return (
            <div>
                <Header as="h3" >Admin</Header>
                {
                    this.state.users.map((user) => {
                        return <p>{user.name}</p>
                    })
                }
            </div>
        )
    }
}