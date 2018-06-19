import React, { Component } from 'react';

import { Form, Message, Button, Header } from 'semantic-ui-react'

const request = require('superagent');

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            password: "",
            error: false,
            loading: false
        }
    }

    checkLoginInformation() {
        this.setState({ loading: true })

        request.post(process.env.REACT_APP_BACKEND + "authenticate/login")
            .send({ username: this.state.name, password: this.state.password })
            .withCredentials()
            .on('error', (err) => {
                if (err.status === 401)
                    this.setState({ error: true, password: "", loading: false })
            })
            .then((res) => {
                this.setState({ password: "", loading: false })
                if (res.text === "Logged in") {
                    this.props.fetchIsLoggedIn()
                }
                console.log(res.text)
            })
    }

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Logg inn</Header>
                <Form error={this.state.error} loading={this.state.loading} >
                    <Form.Input
                        type="text"
                        label="Brukernavn"
                        placeholder="Brukernavn"
                        value={this.state.name}
                        onChange={(_, { value }) => this.setState({ name: value })}
                        onFocus={() => this.setState({ error: false })}
                    />
                    <Form.Input
                        type="password"
                        label="Passord"
                        placeholder="Passord"
                        value={this.state.password}
                        onChange={(_, { value }) => this.setState({ password: value })}
                        onFocus={() => this.setState({ error: false })}
                    />
                    <Message
                        error
                        // header="Feil"
                        content="Feil brukernavn eller passord"
                    />
                    <Form.Field>
                        <Button
                            primary
                            disabled={this.state.name.length === 0 || this.state.password.length === 0}
                            onClick={() => this.checkLoginInformation()}
                        >
                            Logg inn
                        </Button>
                        <Button
                            secondary
                            floated="right"
                            onClick={() => this.props.onShowRegisterChange(true)}
                        >
                            Registrer
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}