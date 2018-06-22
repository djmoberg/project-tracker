import React, { Component } from 'react';

import { hourOptions, minuteOptions, validDate, validFromTo, validComment, getHoursMinutes, hourNow } from '../../utils'

import { Form, Dropdown, TextArea, Segment, Header, Label, Message } from 'semantic-ui-react'

const request = require('superagent');

export default class Add extends Component {
    constructor(props) {
        super(props)

        this.state = {
            workDate: "",
            workFrom: "",
            workTo: "",
            comment: "",
            isValidWorkDate: false,
            isValidWorkFromTo: false,
            isValidComment: false,
            workDateError: false,
            workFromToError: false,
            commentError: false,
            selectedFromHour: hourNow(),
            selectedFromMinute: "00",
            selectedToHour: hourNow(),
            selectedToMinute: "15",
            workAdded: false
        }
    }

    componentDidMount() {
        if (this.props.mode === "add") {
            this.setState({
                workFrom: this.state.selectedFromHour + ":" + this.state.selectedFromMinute,
                workTo: this.state.selectedToHour + ":" + this.state.selectedToMinute
            }, () => {
                this.setState({
                    isValidWorkDate: validDate(this.state.workDate),
                    isValidWorkFromTo: validFromTo(this.state.workFrom, this.state.workTo),
                    isValidComment: validComment(this.state.comment)
                })
            })
        } else {
            let work = this.props.work
            let fromHM = getHoursMinutes(work.workFrom)
            let toHM = getHoursMinutes(work.workTo)

            this.setState({
                workDate: work.workDate,
                workFrom: work.workFrom,
                workTo: work.workTo,
                comment: work.comment,
                isValidWorkDate: true,
                isValidWorkFromTo: true,
                isValidComment: true,
                selectedFromHour: fromHM.timeH,
                selectedFromMinute: fromHM.timeM,
                selectedToHour: toHM.timeH,
                selectedToMinute: toHM.timeM
            })
        }
    }

    addWork() {
        request.post(process.env.REACT_APP_BACKEND + "work/add")
            .send({ workDate: this.state.workDate, workFrom: this.state.workFrom, workTo: this.state.workTo, comment: this.state.comment })
            .withCredentials()
            .then((res) => {
                if (res.body.status === "Work added") {
                    this.props.updateOverview(res.body.overview)

                    this.setState({
                        workDate: "",
                        comment: "",
                        workDateError: false,
                        workFromToError: false,
                        commentError: false,
                        selectedFromHour: hourNow(),
                        selectedFromMinute: "00",
                        selectedToHour: hourNow(),
                        selectedToMinute: "15",
                        workAdded: true
                    }, () => {
                        this.setState({
                            workFrom: this.state.selectedFromHour + ":" + this.state.selectedFromMinute,
                            workTo: this.state.selectedToHour + ":" + this.state.selectedToMinute
                        }, () => {
                            this.setState({
                                isValidWorkDate: validDate(this.state.workDate),
                                isValidWorkFromTo: validFromTo(this.state.workFrom, this.state.workTo),
                                isValidComment: validComment(this.state.comment)
                            })
                        })
                    })
                }
            })
    }

    editWork() {
        request.put(process.env.REACT_APP_BACKEND + "work/edit")
            .send({
                workDate: this.state.workDate,
                workFrom: this.state.workFrom,
                workTo: this.state.workTo,
                comment: this.state.comment,
                id: this.props.work.id
            })
            .withCredentials()
            .then((res) => {
                console.log(res)
            })
    }

    validateWorkFromTo() {
        console.log(validFromTo(this.state.workFrom, this.state.workTo))
        if (validFromTo(this.state.workFrom, this.state.workTo)) {
            this.setState({ isValidWorkFromTo: true, workFromToError: false })
        } else {
            this.setState({ isValidWorkFromTo: false, workFromToError: true })
        }
    }

    allIsValid() {
        return (
            this.state.isValidWorkDate &&
            this.state.isValidWorkFromTo &&
            this.state.isValidComment
        )
    }

    render() {
        return (
            <Segment attached='bottom' >
                <Header as="h4" >{this.props.header}</Header>
                {/* <Segment>
                    <h4>Fjernes</h4>
                    <p>workDate: {this.state.workDate}</p>
                    <p>workFrom: {this.state.workFrom}</p>
                    <p>workTo: {this.state.workTo}</p>
                    <p>comment: {this.state.comment}</p>
                </Segment> */}
                <Form style={{ maxWidth: "400px" }} success={this.state.workAdded} >
                    <Form.Input
                        error={this.state.workDateError}
                        type="Date"
                        label="Dato"
                        value={this.state.workDate}
                        onChange={(_, { value }) => this.setState({ workDate: value }, () => {
                            this.setState({ isValidWorkDate: validDate(this.state.workDate), workDateError: !validDate(this.state.workDate) })
                        })}
                        onFocus={() => {
                            this.setState({ workAdded: false })
                        }}
                    />
                    <Form.Group widths='equal'>
                        <Form.Field error={this.state.workFromToError} >
                            <label>Fra</label>
                            <Dropdown
                                style={{ marginRight: "10px" }}
                                placeholder="00"
                                value={this.state.selectedFromHour}
                                onChange={(_, { value }) => this.setState({ selectedFromHour: value }, () => {
                                    this.setState({ workFrom: this.state.selectedFromHour + ":" + this.state.selectedFromMinute }, () => {
                                        this.validateWorkFromTo()
                                    })
                                })}
                                onFocus={() => {
                                    this.setState({ workAdded: false })
                                }}
                                options={hourOptions()}
                                scrolling
                            />
                            :
                            <Dropdown
                                style={{ marginLeft: "10px" }}
                                placeholder="00"
                                value={this.state.selectedFromMinute}
                                onChange={(_, { value }) => this.setState({ selectedFromMinute: value }, () => {
                                    this.setState({ workFrom: this.state.selectedFromHour + ":" + this.state.selectedFromMinute }, () => {
                                        this.validateWorkFromTo()
                                    })
                                })}
                                onFocus={() => {
                                    this.setState({ workAdded: false })
                                }}
                                options={minuteOptions()}
                            />
                        </Form.Field>
                        <Form.Field error={this.state.workFromToError} >
                            <label>Til</label>
                            <Dropdown
                                style={{ marginRight: "10px" }}
                                placeholder="00"
                                value={this.state.selectedToHour}
                                onChange={(_, { value }) => this.setState({ selectedToHour: value }, () => {
                                    this.setState({ workTo: this.state.selectedToHour + ":" + this.state.selectedToMinute }, () => {
                                        this.validateWorkFromTo()
                                    })
                                })}
                                onFocus={() => {
                                    this.setState({ workAdded: false })
                                }}
                                options={hourOptions()}
                                scrolling
                            />
                            :
                            <Dropdown
                                style={{ marginLeft: "10px" }}
                                placeholder="00"
                                value={this.state.selectedToMinute}
                                onChange={(_, { value }) => this.setState({ selectedToMinute: value }, () => {
                                    this.setState({ workTo: this.state.selectedToHour + ":" + this.state.selectedToMinute }, () => {
                                        this.validateWorkFromTo()
                                    })
                                })}
                                onFocus={() => {
                                    this.setState({ workAdded: false })
                                }}
                                options={minuteOptions()}
                            />
                            {this.state.workFromToError &&
                                <Label color="red" pointing>
                                    Tid til må være etter tid fra!
                                </Label>
                            }
                        </Form.Field>
                    </Form.Group>
                    <Form.Field error={this.state.commentError} >
                        <label>Kommentar</label>
                        <TextArea
                            value={this.state.comment}
                            onChange={(_, { value }) => this.setState({ comment: value }, () => {
                                this.setState({ isValidComment: validComment(this.state.comment), commentError: !validComment(this.state.comment) })
                            })}
                            onFocus={() => {
                                this.setState({ workAdded: false })
                            }}
                        />
                    </Form.Field>
                    <Message
                        success
                        header='Arbeid lagt til!'
                        content='Arbeidet er blitt lagt til prosjektet'
                    />
                    {this.props.mode === "add" &&
                        <Form.Button
                            primary
                            disabled={!this.allIsValid()}
                            onClick={() => this.addWork()}
                        >
                            Legg til
                        </Form.Button>
                    }
                    {this.props.mode === "edit" &&
                        <Form.Button
                            primary
                            disabled={!this.allIsValid()}
                            onClick={() => this.editWork()}
                        >
                            Lagre
                        </Form.Button>
                    }
                </Form>
            </Segment>
        )
    }
}