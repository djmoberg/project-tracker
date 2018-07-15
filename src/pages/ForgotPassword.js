import React, { Component } from 'react';

import { sendNewPassword } from '../APIish'
import { validEmail } from '../utils'

import { Form, Button, Header, Segment, Message } from 'semantic-ui-react'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            success: false
        }
    }


    render() {
        return (
            <Segment basic style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center" }} >Glemt Passord</Header>
                <Form success={this.state.success} >
                    <Form.Input
                        type="email"
                        label="Email"
                        value={this.state.email}
                        onChange={(_, { value }) => this.setState({ email: value })}
                    />
                    <Form.Field>
                        <Button.Group widths='2'>
                            <Button
                                secondary
                                onClick={() => this.props.onForgotPasswordChange(false)}
                            >
                                Tilbake
                            </Button>
                            <Button
                                primary
                                disabled={!validEmail(this.state.email)}
                                onClick={() => {
                                    sendNewPassword(this.state.email, (res) => {
                                        if (res.text === "New password sent")
                                            this.setState({ email: "", success: true })
                                    })
                                }}
                            >
                                Send
                            </Button>
                        </Button.Group>
                    </Form.Field>
                    <Message
                        success
                        content="Nytt passord er blitt sendt til din epost"
                    />
                </Form>
            </Segment>
        )
    }
}