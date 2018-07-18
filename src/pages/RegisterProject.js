import React, { Component } from 'react';

import { registerProject } from '../APIish'

import { Form, Button, Header } from 'semantic-ui-react'

export default class RegisterProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            description: ""
        }
    }

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Nytt Prosjekt</Header>
                <Form>
                    <Form.Input
                        required
                        type="text"
                        label="Navn"
                        placeholder="Navn"
                        value={this.state.name}
                        onChange={(_, { value }) => this.setState({ name: value })}
                    />
                    <Form.TextArea
                        label="Beskrivelse"
                        placeholder="Beskrivelse"
                        maxLength="255"
                        value={this.state.description}
                        onChange={(_, { value }) => this.setState({ description: value })}
                    />
                    <Form.Field>
                        <Button
                            primary
                            fluid
                            disabled={this.state.name.length === 0}
                            onClick={() => {
                                registerProject(this.state.name, this.state.description, (res) => {
                                    this.setState({ name: "" })
                                    if (res.body.msg === "Project added")
                                        this.props.onRegistered("chooseProject", res.body.projectId)
                                })
                            }}
                        >
                            Registrer
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}