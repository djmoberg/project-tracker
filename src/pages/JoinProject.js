import React, { Component } from 'react';

import { searchProject, sendJoinRequest } from '../APIish'

import { Form, Search, Button, Header, Message } from 'semantic-ui-react'

// const request = require('superagent');

export default class RegisterProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            results: [],
            value: "",
            selectedProject: 0,
            buttonDisabled: true,
            success: false
        }
    }

    handleResultSelect = (e, { result }) => {
        this.setState({ value: result.title, selectedProject: result.id, buttonDisabled: false })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ buttonDisabled: true }, () => {
            if (value.length !== 0) {
                this.setState({ isLoading: true, value }, () => {
                    searchProject(value, (res) => {
                        let results = res.body.reduce((result, project) => {
                            if (project.name === value && !this.props.projects.some((project2) => { return project2.text === project.name })) {
                                this.setState({ buttonDisabled: false, selectedProject: project.id })
                            }
                            if (!this.props.projects.some((project2) => { return project2.text === project.name }))
                                result.push({
                                    title: project.name,
                                    description: "Beskrivelse av prosjektet",
                                    id: project.id,
                                    key: project.id
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

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Søk</Header>
                <Form success={this.state.success} >
                    <Form.Field>
                        <Search
                            loading={this.state.isLoading}
                            onResultSelect={this.handleResultSelect}
                            onSearchChange={this.handleSearchChange}
                            results={this.state.results}
                            value={this.state.value}
                            noResultsMessage="Ingen resultater."
                        // minCharacters={2}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            primary
                            fluid
                            disabled={this.state.buttonDisabled}
                            onClick={() => {
                                sendJoinRequest(this.state.selectedProject, (res) => {
                                    if (res.text === "Request sent")
                                        this.setState({ success: true, value: "", results: [], buttonDisabled: true })
                                })
                            }}
                        >
                            Send Forespørsel
                        </Button>
                    </Form.Field>
                    <Message
                        success
                        content="Forespørselen din er blitt sendt!"
                    />
                </Form>
            </div>
        )
    }
}