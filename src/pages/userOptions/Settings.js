import React, { Component } from 'react';

import { newPassword } from '../../APIish'
import { validPassword } from '../../utils'

import { Header, Segment, Divider, Form, Message } from 'semantic-ui-react'

export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newPassword: "",
            newPassword2: "",
            newPasswordError: false,
            newPasswordValid: false,
            passwordChanged: false
        }
    }

    validPasswords() {
        return this.state.newPassword === this.state.newPassword2 && validPassword(this.state.newPassword)
    }

    render() {
        return (
            <div>
                <Header as="h3" >Innstillinger</Header>
                <Segment>
                    <Header as="h4" >Endre passord</Header>
                    <Divider />
                    <Form style={{ maxWidth: "400px" }} error={this.state.newPasswordError} success={this.state.passwordChanged} >
                        <Form.Input
                            error={this.state.newPasswordError}
                            type="password"
                            label="Nytt Passord"
                            value={this.state.newPassword}
                            onChange={(_, { value }) => this.setState({ newPassword: value }, () => {
                                this.setState({ newPasswordValid: this.validPasswords() })
                            })}
                            onBlur={() => {
                                this.setState({ newPasswordError: !validPassword(this.state.newPassword) })
                            }}
                            onFocus={() => {
                                this.setState({ newPasswordError: false })
                            }}
                        />
                        <Form.Input
                            type="password"
                            label="Bekreft Nytt Passord"
                            value={this.state.newPassword2}
                            onChange={(_, { value }) => this.setState({ newPassword2: value }, () => {
                                this.setState({ newPasswordValid: this.validPasswords() })
                            })}
                        />
                        <Message
                            error
                            content="Passord må være 3 tegn eller mer"
                        />
                        <Form.Button
                            primary
                            disabled={!this.state.newPasswordValid}
                            onClick={() => {
                                newPassword(this.state.newPassword, (res) => {
                                    if (res.text === "New password") {
                                        this.setState({ passwordChanged: true })
                                    }
                                })
                            }}
                        >
                            Endre Passord
                        </Form.Button>
                        <Message
                            success
                            content="Passord er endret"
                        />
                    </Form>
                </Segment>
            </div>
        )
    }
}