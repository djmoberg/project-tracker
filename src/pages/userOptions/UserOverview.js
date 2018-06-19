import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react'

export default class UserOverview extends Component {
    render() {
        return (
            <Segment attached='bottom' >
                <h3>Oversikt Bruker</h3>
            </Segment>
        )
    }
}