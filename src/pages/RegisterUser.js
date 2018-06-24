import React, { Component } from 'react';

import { registerUser, isUsernameValid } from '../APIish'

import { Form, Message, Button, Header } from 'semantic-ui-react'

//TODO
//Feilmeldinger
//Email

export default class RegisterUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            password2: "",
            email: "",
            error: false,
            usernameIsValid: false,
            passwordIsValid: false,
            emailIsValid: true, //endre
            loading: false,
            usernameInputIcon: " ",
            passwordInputIcon: " "
        }
    }

    registerUser() {
        registerUser({
            username: this.state.username,
            password: this.state.password
        }, (res) => {
            this.setState({ password: "" })
            if (res.text === "User added")
                this.props.onShowRegisterChange(false)
        })
    }

    isUsernameValid(username) {
        if (username.length !== 0) {
            this.setState({ loading: true })
            isUsernameValid(username, (res) => {
                if (res.text === "false")
                    this.setState({ usernameIsValid: true, loading: false, usernameInputIcon: "check green" })
                else
                    this.setState({ usernameIsValid: false, loading: false, usernameInputIcon: "warning sign red" })
            })
        } else {
            this.setState({ usernameIsValid: false, usernameInputIcon: " " })
        }
    }

    isPasswordValid(pass, pass2) {
        return pass.length !== 0 && pass2.length !== 0 && pass === pass2
        // if (pass.length !== 0 && pass2.length !== 0) {
        //     if (pass === pass2) {
        //         return true
        //     } else {
        //         return false
        //     }
        // } else {
        //     return false
        // }
    }

    allIsValid() {
        return (
            this.state.usernameIsValid &&
            this.state.passwordIsValid &&
            this.state.emailIsValid
        )
    }

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Registrer</Header>
                <Form error={this.state.error} >
                    <Form.Input
                        required
                        error={this.state.usernameInputIcon === "warning sign red"}
                        icon={this.state.usernameInputIcon}
                        loading={this.state.loading}
                        type="text"
                        label="Brukernavn"
                        placeholder="Brukernavn"
                        value={this.state.username}
                        onChange={(_, { value }) => this.setState({ username: value }, () => {
                            this.isUsernameValid(this.state.username)
                        })}
                        onFocus={() => this.setState({ error: false })}
                    // onBlur={() => this.isUsernameValid(this.state.username)}
                    />
                    {/* <Label color="red" basic pointing>Please enter a value</Label> */}
                    <Form.Input
                        required
                        icon={this.state.passwordInputIcon}
                        type="password"
                        label="Passord"
                        placeholder="********"
                        value={this.state.password}
                        onChange={(_, { value }) => this.setState({ password: value }, () => {
                            if (this.isPasswordValid(this.state.password, this.state.password2))
                                this.setState({ passwordIsValid: true })
                            else
                                this.setState({ passwordIsValid: false })
                        })}
                        onFocus={() => this.setState({ error: false })}
                    />
                    <Form.Input
                        required
                        error={this.state.password2Error}
                        icon={this.state.passwordInputIcon}
                        type="password"
                        label="Gjenta Passord"
                        placeholder="********"
                        value={this.state.password2}
                        onChange={(_, { value }) => this.setState({ password2: value }, () => {
                            this.setState({ password2Error: false })

                            if (this.isPasswordValid(this.state.password, this.state.password2))
                                this.setState({ passwordIsValid: true, passwordInputIcon: "check green" })
                            else if (this.state.password.length < this.state.password2.length)
                                this.setState({ passwordIsValid: false, password2Error: true, passwordInputIcon: "warning sign red" })
                            else
                                this.setState({ passwordIsValid: false, passwordInputIcon: " " })
                        })}
                        onFocus={() => this.setState({ error: false, password2Error: false })}
                        onBlur={() => {
                            if (this.state.password !== this.state.password2)
                                this.setState({ password2Error: true, passwordInputIcon: "warning sign red" })
                        }}
                    />
                    <Form.Input
                        type="email"
                        label="Email"
                        placeholder=""
                        value={this.state.email}
                        onChange={(_, { value }) => this.setState({ email: value })}
                        onFocus={() => this.setState({ error: false })}
                    />
                    <Message
                        error
                        // header="Feil"
                        content="Feil brukernavn eller passord"
                    />
                    <Form.Field>
                        <Button
                            secondary
                            onClick={() => this.props.onShowRegisterChange(false)}
                        >
                            Tilbake
                        </Button>
                        <Button
                            primary
                            floated="right"
                            disabled={!this.allIsValid()}
                            onClick={() => this.registerUser()}
                        >
                            Registrer
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}