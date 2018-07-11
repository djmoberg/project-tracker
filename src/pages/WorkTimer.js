import React, { Component } from 'react';

import { validComment, roundTime, calculateHours } from '../utils'

import { Button, Modal, Header, TextArea, Form } from 'semantic-ui-react'

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
            comment: ""
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    clockIn = () => {
        this.setState({ startTime: Date.now() }, () => {
            this.timerID = setInterval(() => this.updateTime(), 500)
        })
    }

    clockOut = () => {
        clearInterval(this.timerID)
        let startTime = new Date(this.state.startTime)
        let nowTime = new Date()
        this.setState({
            workDate: startTime.toLocaleDateString(),
            workFrom: roundTime(startTime),
            workTo: roundTime(nowTime),
            modalOpen: true
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
                    <Button primary size="massive" onClick={this.clockIn} >Stemple inn</Button>
                </div>
            )
        else
            return (
                <div>
                    <p>Du begynte å arbeide: {new Date(this.state.startTime).toLocaleString()}</p>
                    <p>Arbeidstid: {this.state.time}</p>
                    <Button primary size="massive" onClick={this.clockOut} >Stemple ut</Button>

                    <Modal
                        closeIcon
                        open={this.state.modalOpen}
                        onClose={() => this.setState({ modalOpen: false, startTime: 0, time: "00:00:00" })}
                    >
                        <Header icon="clock" content="Stemple ut" />
                        <Modal.Content>
                            <Form>
                                <Form.Field>
                                    <label>Dato</label>
                                    <p>{this.state.workDate}</p>
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
                        {/* <Modal.Actions>
                        <Button color="red" onClick={() => this.setState({ modalOpen: false })} >
                            <Icon name="remove" /> Lukk
                        </Button>
                    </Modal.Actions> */}
                    </Modal>
                </div>
            )
    }
}