import React, { Component } from 'react';

import { login } from '../APIish'
import ForgotPassword from './ForgotPassword'

import { Form, Message, Button, Header, Segment, Label } from 'semantic-ui-react'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            password: "",
            error: false,
            loading: false,
            forgotPassword: false
        }
    }

    checkLoginInformation() {
        this.setState({ loading: true })

        login({
            username: this.state.name,
            password: this.state.password
        }, (err) => {
            if (err.status === 401)
                this.setState({ error: true, password: "", loading: false })
        }, (res) => {
            this.setState({ password: "", loading: false })
            if (res.text === "Logged in")
                this.props.fetchIsLoggedIn()
        })
    }

    handleForgotPasswordChange = (value) => {
        this.setState({ forgotPassword: value })
    }

    render() {
        if (this.state.forgotPassword)
            return <ForgotPassword onForgotPasswordChange={this.handleForgotPasswordChange} />
        else
            return (
                <Segment basic style={{ maxWidth: "300px", margin: "0 auto" }} >
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
                        <Form.Field>
                            <Label as="a" onClick={() => this.handleForgotPasswordChange(true)} >
                                Glemt Passord?
                            </Label>
                        </Form.Field>
                        <Message
                            error
                            // header="Feil"
                            content="Feil brukernavn eller passord"
                        />
                        <Form.Field>
                            <Button
                                secondary
                                fluid
                                onClick={() => this.props.onShowRegisterChange(true)}
                            >
                                Registrer
                            </Button>
                        </Form.Field>
                        <Form.Field>
                            <Button
                                primary
                                fluid
                                disabled={this.state.name.length === 0 || this.state.password.length === 0}
                                onClick={() => this.checkLoginInformation()}
                            >
                                Logg inn
                            </Button>
                        </Form.Field>
                    </Form>
                </Segment>
            )
    }
}