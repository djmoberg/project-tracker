import React, { Component } from 'react';

import { Form, Message, Button, Header } from 'semantic-ui-react'

// const request = require('superagent');

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
                <Header as="h2" style={{ textAlign: "center" }} >Søk</Header>
                <Form error={this.state.error} >
                    <Form.Dropdown
                        fluid
                        selection
                        search
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
                            onClick={() => this.registerUser()}
                        >
                            Send Forespørsel
                        </Button>
                    </Form.Field>
                </Form>
            </div>
        )
    }
}