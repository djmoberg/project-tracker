import React, { Component } from 'react';

import { validComment, roundTime, calculateHours, formatDate } from '../utils'
import { getTimer, setTimer, addWork, deleteTimer } from '../APIish'

import { Button, Modal, Header, TextArea, Form, Message } from 'semantic-ui-react'

export default class WorkTimer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startTime: 0,
            time: "00:00:00",
            modalOpen: false,
            workDate: "",
            workFrom: "",
            workTo: "",
            comment: "",
            isValidComment: false,
            commentError: false,
            deletedStartTime: 0,
            clockOutWarning: false
        }
    }

    componentWillMount() {
        getTimer((res) => {
            if (res.body.startTime !== 0) {
                this.setState({ startTime: res.body.startTime }, () => {
                    this.timerID = setInterval(() => this.updateTime(), 500)
                })
            }
        })
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    clockIn = (startTime) => {
        setTimer(startTime, (res) => {
            if (res.text === "Timer added") {
                this.setState({ startTime: startTime, deletedStartTime: 0 }, () => {
                    this.timerID = setInterval(() => this.updateTime(), 500)
                })
            }
        })
    }

    clockOut = () => {
        let startTime = new Date(this.state.startTime)
        let nowTime = new Date()
        let workFrom = roundTime(startTime)
        let workTo = roundTime(nowTime)

        if (calculateHours(workFrom, workTo) > 0) {
            clearInterval(this.timerID)
            this.setState({
                workDate: startTime.toISOString(),
                workFrom: workFrom,
                workTo: workTo,
                modalOpen: true
            })
        } else {
            this.setState({ clockOutWarning: true })
        }
    }

    cancelTimer = () => {
        deleteTimer((res) => {
            clearInterval(this.timerID)
            this.setState({ deletedStartTime: this.state.startTime }, () => {
                this.setState({ startTime: 0, time: "00:00:00" })
            })
        })
    }

    updateTime() {
        let time = Date.now() - this.state.startTime
        let h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
        let s = Math.floor((time % (1000 * 60)) / 1000)
        this.setState({ time: this.fillTime(h) + ":" + this.fillTime(m) + ":" + this.fillTime(s) })
    }

    fillTime(time) {
        if (time < 10)
            return "0" + time
        else
            return time
    }

    render() {
        if (this.state.startTime === 0)
            return (
                <div>
                    {this.state.deletedStartTime !== 0 &&
                        <Button secondary size="massive" onClick={() => this.clockIn(this.state.deletedStartTime)} >Gjenopprett</Button>
                    }
                    <Button primary size="massive" onClick={() => this.clockIn(Date.now())} >Stemple inn</Button>
                </div>
            )
        else
            return (
                <div>
                    <div style={{ marginBottom: "64px" }} >
                        <Header
                            as="h3"
                            icon="calendar alternate"
                            content="Du begynte å arbeide"
                            subheader={new Date(this.state.startTime).toLocaleString()}
                        />
                        <Header
                            as="h3"
                            icon="clock"
                            content="Arbeidstid"
                            subheader={this.state.time}
                        />
                    </div>
                    <Button.Group size="big" >
                        <Button negative onClick={this.cancelTimer} >Avbryt</Button>
                        <Button.Or text="||" />
                        <Button primary onClick={this.clockOut} >Stemple ut</Button>
                    </Button.Group>
                    {/* <Button primary size="massive" onClick={this.clockOut} >Stemple ut</Button> */}

                    {this.state.clockOutWarning &&
                        <Message
                            warning
                            content="Du må jobbe minst 15 min for å kunne stemple ut"
                        />
                    }

                    <Modal
                        closeIcon
                        open={this.state.modalOpen}
                        onClose={() => {
                            this.setState({ modalOpen: false })
                            this.timerID = setInterval(() => this.updateTime(), 500)
                        }}
                    >
                        <Header icon="clock" content="Stemple ut" />
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>Dato</label>
                                    <p>{new Date(this.state.workDate).toLocaleDateString()}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Fra</label>
                                    <p>{this.state.workFrom}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Til</label>
                                    <p>{this.state.workTo}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Timer</label>
                                    <p>{calculateHours(this.state.workFrom, this.state.workTo)}</p>
                                </Form.Field>
                                <Form.Field>
                                    <label>Kommentar</label>
                                    <TextArea
                                        value={this.state.comment}
                                        onChange={(_, { value }) => this.setState({ comment: value }, () => {
                                            this.setState({ isValidComment: validComment(this.state.comment), commentError: !validComment(this.state.comment) })
                                        })}
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                negative
                                onClick={() => {
                                    this.setState({ modalOpen: false })
                                    this.timerID = setInterval(() => this.updateTime(), 500)
                                }}
                                content="Avbryt"
                            >
                            </Button>
                            <Button
                                positive
                                onClick={() => {
                                    addWork({
                                        workDate: formatDate(this.state.workDate),
                                        workFrom: this.state.workFrom,
                                        workTo: this.state.workTo,
                                        comment: this.state.comment,
                                        addedUsers: []
                                    }, (res) => {
                                        if (res.body.status === "Work added") {
                                            deleteTimer((res2) => {
                                                this.props.updateOverview(res.body.overview)
                                                this.setState({ modalOpen: false, startTime: 0, time: "00:00:00" })
                                            })
                                        }
                                    })
                                }}
                                disabled={!this.state.isValidComment}
                                icon="checkmark"
                                labelPosition="right"
                                content="Lagre"
                            />
                        </Modal.Actions>
                    </Modal>
                </div>
            )
    }
}