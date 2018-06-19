import React, { Component } from 'react';

import { Form, Header } from 'semantic-ui-react'

const request = require('superagent');

export default class RegisterUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            selectedProject: ""
        }
    }

    componentWillMount() {
        this.fetchProjects()
    }

    fetchProjects() {
        request
            .get(process.env.REACT_APP_BACKEND + "projects")
            .withCredentials()
            .then((res) => {
                let projects = []

                res.body.forEach((project) => {
                    projects.push({ text: project.name, value: project.id })
                })

                this.setState({ projects })
            })
    }

    handleSelectedProjectChange = (_, { name, value }) => this.setState({ selectedProject: value })

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Velg Prosjekt</Header>
                <Form>
                    <Form.Dropdown
                        fluid
                        selection
                        value={this.state.selectedProject}
                        options={this.state.projects}
                        onChange={this.handleSelectedProjectChange}
                    />
                    <Form.Button
                        fluid
                        color="red"
                        onClick={() => this.props.onProjectSelected(this.state.selectedProject)}
                    >
                        Velg
                    </Form.Button>
                    {/* <Form.Button
                        fluid
                        color="red"
                    >
                        Nytt Prosjekt
                    </Form.Button>
                    <Form.Button
                        fluid
                        color="black"
                    >
                        Bli med i prosjekt
                    </Form.Button> */}
                </Form>
            </div>
        )
    }
}