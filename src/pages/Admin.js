import React, { Component } from 'react';

import { getUsers, searchUser, addUser, removeUser, makeAdmin, deleteProject, getJoinRequests, deleteJoinRequest } from '../APIish'

import { Header, Segment, Search, Button, Divider, List, Dropdown, Modal, Form, Label } from 'semantic-ui-react'

export default class Admin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            isLoading: false,
            results: [],
            value: "",
            buttonDisabled: true,
            removedUsername: "",
            modalOpen: false,
            projectName: "",
            joinRequests: []
        }
    }

    componentDidMount() {
        this.fetchUsers()
        this.fetchJoinRequests()
    }

    fetchUsers() {
        getUsers((res) => {
            this.setState({ users: res.body })
        })
    }

    fetchJoinRequests() {
        getJoinRequests((res) => {
            this.setState({ joinRequests: res.body })
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
                    searchUser(value, (res) => {
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
        addUser(username, (res) => {
            if (res.text === "User added") {
                this.setState({ value: "", buttonDisabled: true })
                this.fetchUsers()
            }
        })
    }

    removeUser = (username) => {
        removeUser(username, (res) => {
            if (res.text === "User removed") {
                this.fetchUsers()
                this.setState({ removedUsername: username })
            }
        })
    }

    makeAdmin = (username) => {
        makeAdmin(username, (res) => {
            if (res.text === "New admin") {
                this.fetchUsers()
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
                                                <List.Description>
                                                    <Dropdown text='Valg'>
                                                        <Dropdown.Menu>
                                                            {!user.isAdmin &&
                                                                <Dropdown.Item
                                                                    icon='user plus'
                                                                    text='Gjør til admin'
                                                                    onClick={() => this.makeAdmin(user.name)}
                                                                />
                                                            }
                                                            <Dropdown.Item
                                                                icon='trash'
                                                                text='Fjern'
                                                                onClick={() => this.removeUser(user.name)}
                                                            />
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </List.Description>
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
                    <Header as="h4" >Forespørsler om å bli med i prosjektet</Header>
                    <Divider />
                    <List divided >
                        {this.state.joinRequests.map(user =>
                            <List.Item key={user.name} >
                                <Label basic horizontal size="big" >{user.name}</Label>
                                <Button.Group size="large" >
                                    <Button
                                        negative
                                        content="Avslå"
                                        onClick={() => {
                                            deleteJoinRequest(user.id, (res) => {
                                                this.fetchJoinRequests()
                                            })
                                        }}
                                    />
                                    <Button.Or text="||" />
                                    <Button
                                        positive
                                        content="Godta"
                                        onClick={() => {
                                            addUser(user.name, (res) => {
                                                if (res.text === "User added")
                                                    deleteJoinRequest(user.id, (res) => {
                                                        this.fetchJoinRequests()
                                                        this.fetchUsers()
                                                    })
                                            })
                                        }}
                                    />
                                </Button.Group>
                            </List.Item>
                        )}
                    </List>
                </Segment>
                <Segment>
                    <Header as="h4" >Slett Prosjekt</Header>
                    <Divider />
                    <Button
                        color="red"
                        onClick={() => {
                            this.setState({ modalOpen: true })
                        }}
                    >
                        Slett
                    </Button>
                    <Modal open={this.state.modalOpen} onClose={() => this.setState({ modalOpen: false })}>
                        <Modal.Header>Slett Prosjekt</Modal.Header>
                        <Modal.Content>
                            <p>Prosjektet vil bli slettet <b>permanent</b></p>
                            <p>Er du sikker på at du vil slette prosjektet?</p>
                            <Form>
                                <Form.Input
                                    type="text"
                                    label={"Skriv navnet på prosjektet (" + this.props.projectName + ") før du kan slette"}
                                    value={this.state.projectName}
                                    onChange={(_, { value }) => this.setState({ projectName: value })}
                                />
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                negative
                                content="Nei"
                                onClick={() => this.setState({ modalOpen: false })}
                            />
                            <Button
                                positive
                                icon="checkmark"
                                labelPosition="right"
                                content="Ja"
                                disabled={this.state.projectName !== this.props.projectName}
                                onClick={() => {
                                    deleteProject((res) => {
                                        if (res.text === "Project deleted") {
                                            this.setState({ modalOpen: false })
                                            this.props.onDeleteProject()
                                        }
                                    })
                                }}
                            />
                        </Modal.Actions>
                    </Modal>
                </Segment>
            </div>
        )
    }
}