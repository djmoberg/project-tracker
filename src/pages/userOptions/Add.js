import React, { Component } from 'react';
import { hourOptions, minuteOptions } from '../../utils'

import { Form, Dropdown, TextArea, Segment } from 'semantic-ui-react'

export default class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: {
                workFrom: "",
                workTo: ""
            },
            selectedFromHour: "00",
            selectedFromMinute: "00",
            selectedToHour: "00",
            selectedToMinute: "00"
        }
    }

    render() {
        return (
            <Segment attached='bottom' >
                <h3>Legg til arbeid</h3>
                <Form style={{ maxWidth: "400px" }} >
                    <Form.Input type="Date" label="Dato" />
                    <Form.Group widths='equal'>
                        <Form.Field>
                            <label>Fra</label>
                            <Dropdown
                                style={{ marginRight: "10px" }}
                                placeholder="00"
                                value={this.state.selectedFromHour}
                                onChange={(_, { value }) => this.setState({ selectedFromHour: value })}
                                options={hourOptions()}
                                scrolling
                            />
                            :
                        <Dropdown
                                style={{ marginLeft: "10px" }}
                                placeholder="00"
                                value={this.state.selectedFromMinute}
                                onChange={(_, { value }) => this.setState({ selectedFromMinute: value })}
                                options={minuteOptions()}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Til</label>
                            <Dropdown
                                style={{ marginRight: "10px" }}
                                placeholder="00"
                                value={this.state.selectedToHour}
                                onChange={(_, { value }) => this.setState({ selectedToHour: value })}
                                options={hourOptions()}
                                scrolling
                            />
                            :
                        <Dropdown
                                style={{ marginLeft: "10px" }}
                                placeholder="00"
                                value={this.state.selectedToMinute}
                                onChange={(_, { value }) => this.setState({ selectedToMinute: value })}
                                options={minuteOptions()}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <label>Kommentar</label>
                        <TextArea />
                    </Form.Field>
                    <Form.Button>Legg til</Form.Button>
                </Form>
            </Segment>
        )
    }
}