import React, { Component } from 'react';

import { registerProject } from '../APIish'

import { Form, Message, Button, Header } from 'semantic-ui-react'

export default class RegisterProject extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            error: false
        }
    }

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Nytt Prosjekt</Header>
                <Form error={this.state.error} >
                    <Form.Input
                        required
                        type="text"
                        label="Navn"
                        placeholder="Navn"
                        value={this.state.name}
                        onChange={(_, { value }) => this.setState({ name: value })}
                        onFocus={() => this.setState({ error: false })}
                    //onBlur sjekk om det eksisterer
                    />
                    <Message
                        error
                        // header="Feil"
                        content="Feil brukernavn eller passord"
                    />
                    <Form.Field>
                        <Button
                            primary
                            fluid
                            disabled={this.state.name.length === 0}
                            onClick={() => {
                                registerProject(this.state.name, (res) => {
                                    this.setState({ name: "" })
                                    if (res.text === "Project added")
                                        this.props.onRegistered("chooseProject")
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