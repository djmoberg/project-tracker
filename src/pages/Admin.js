import React, { Component } from 'react';

import { Header, Segment, Search, Button, Divider, List } from 'semantic-ui-react'

const request = require('superagent');

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            isLoading: false,
            results: [],
            value: "",
            buttonDisabled: true,
            removedUsername: ""
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
                this.setState({ users: res.body })
            })
    }

    // findUser(input) {
    //     request
    //         .get(process.env.REACT_APP_BACKEND + "users/find/" + input)
    //         .withCredentials()
    //         .then((res) => {
    //             console.log(res.body)
    //             this.setState({ results: res.body })
    //         })
    // }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, buttonDisabled: false })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ buttonDisabled: true }, () => {
            if (value.length !== 0) {
                this.setState({ isLoading: true, value }, () => {
                    request
                        .get(process.env.REACT_APP_BACKEND + "users/find/" + value)
                        .withCredentials()
                        .then((res) => {
                            let results = res.body.reduce((result, user) => {
                                if (user.name === value && !this.state.users.some((user2) => { return user2.name === user.name })) {
                                    this.setState({ buttonDisabled: false })
                                }
                                if (!this.state.users.some((user2) => { return user2.name === user.name }))
                                    result.push({
                                        title: user.name,
                                        // description: "Bruker",
                                        // image: "https://s3.amazonaws.com/uifaces/faces/twitter/Stievius/128.jpg",
                                        // price: "$12.76"
                                    })
                                return result
                            }, [])
                            this.setState({ isLoading: false, results })
                        })
                })
            } else {
                this.setState({ results: [], value })
            }
        })
    }

    addUser = (username) => {
        request
            .post(process.env.REACT_APP_BACKEND + "project/addUser")
            .send({ username })
            .withCredentials()
            .then((res) => {
                if (res.text === "User added") {
                    this.setState({ value: "", buttonDisabled: true })
                    this.fetchUsers()
                }
            })
    }

    removeUser = (username) => {
        request
            .delete(process.env.REACT_APP_BACKEND + "project/removeUser")
            .send({ username })
            .withCredentials()
            .then((res) => {
                if (res.text === "User removed") {
                    this.fetchUsers()
                    this.setState({ removedUsername: username })
                }
            })
    }

    render() {
        return (
            <div>
                <Header as="h3" >Admin</Header>
                <Segment>
                    <Header as="h4" >Brukere i Prosjektet</Header>
                    <Divider />
                    <List horizontal divided >
                        {
                            this.state.users.map((user) => { //endre til reduce
                                if (user.name !== this.props.user.username)
                                    return (
                                        <List.Item key={user.name} >
                                            <List.Content>
                                                <List.Header>{user.name}</List.Header>
                                                <List.Description><Button secondary onClick={() => this.removeUser(user.name)} >Fjern</Button></List.Description>
                                            </List.Content>
                                        </List.Item>
                                    )
                                else
                                    return null
                            })
                        }
                        {this.state.removedUsername !== "" &&
                            <List.Item>
                                <Button
                                    basic
                                    icon="undo"
                                    onClick={() => {
                                        this.addUser(this.state.removedUsername)
                                        this.setState({ removedUsername: "" })
                                    }}
                                />
                            </List.Item>
                        }
                    </List>
                </Segment>
                <Segment>
                    <Header as="h4" >Legg Til Bruker</Header>
                    <Divider />
                    {/* <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Search
                                    loading={this.state.isLoading}
                                    onResultSelect={this.handleResultSelect}
                                    onSearchChange={this.handleSearchChange}
                                    results={this.state.results}
                                    value={this.state.value}
                                    noResultsMessage="Ingen resultater."
                                // minCharacters={2}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button
                                    primary
                                    disabled={this.state.buttonDisabled}
                                    onClick={this.addUser}
                                >
                                    Legg til
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> */}
                    <List horizontal>
                        <List.Item>
                            <Search
                                loading={this.state.isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={this.handleSearchChange}
                                results={this.state.results}
                                value={this.state.value}
                                noResultsMessage="Ingen resultater."
                            // minCharacters={2}
                            />
                        </List.Item>
                        <List.Item>
                            <Button
                                primary
                                disabled={this.state.buttonDisabled}
                                onClick={() => this.addUser(this.state.value)}
                            >
                                Legg til
                            </Button>
                        </List.Item>
                    </List>
                </Segment>
                <Segment>
                    <Header as="h4" >Slett Prosjekt</Header>
                    <Divider />
                    <Button color="red" >Slett</Button>
                </Segment>
            </div>
        )
    }
}