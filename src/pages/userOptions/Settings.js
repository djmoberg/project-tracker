import React, { Component } from 'react';

import { newPassword, getDeletedWork, addWork, deleteTrash } from '../../APIish'
import { validPassword, calculateHours, limitTo } from '../../utils'

import { Header, Segment, Divider, Form, Message, Table, Button, Modal } from 'semantic-ui-react'

export default class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newPassword: "",
            newPassword2: "",
            newPasswordError: false,
            newPasswordValid: false,
            passwordChanged: false,
            deletedWork: []
        }
    }

    componentWillMount() {
        getDeletedWork((res) => {
            this.setState({ deletedWork: res.body })
        })
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
                <Segment>
                    <Header as="h4" >Papirkurv</Header>
                    <Divider />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Dato</Table.HeaderCell>
                                <Table.HeaderCell>Tid</Table.HeaderCell>
                                <Table.HeaderCell>Timer</Table.HeaderCell>
                                <Table.HeaderCell>Kommentar</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                this.state.deletedWork.map((overview, index) =>
                                    <Table.Row
                                        key={index}
                                    >
                                        <Table.Cell>
                                            {new Date(overview.workDate).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {overview.workFrom} - {overview.workTo}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {calculateHours(overview.workFrom, overview.workTo)}
                                        </Table.Cell>
                                        <Table.Cell
                                            style={{ cursor: "pointer" }}
                                            onClick={() => this.setState({ modalOpen: true, selectedComment: overview.comment })}
                                        >
                                            {limitTo(overview.comment)}
                                        </Table.Cell>
                                        <Table.Cell collapsing>
                                            <Button.Group>
                                                <Button
                                                    positive
                                                    onClick={() => {
                                                        let work = {
                                                            workDate: overview.workDate,
                                                            workFrom: overview.workFrom,
                                                            workTo: overview.workTo,
                                                            comment: overview.comment,
                                                            addedUsers: []
                                                        }
                                                        addWork(work, (res) => {
                                                            if (res.body.status === "Work added")
                                                                deleteTrash(overview.id, (res2) => {
                                                                    if (res2.text === "Work deleted") {
                                                                        this.props.updateOverview(res.body.overview)
                                                                        this.setState({ deletedWork: this.state.deletedWork.filter(work => work.id !== overview.id) })
                                                                    }
                                                                })
                                                        })
                                                    }}
                                                >
                                                    Gjenopprett
                                                </Button>
                                                <Button.Or text="||" />
                                                <Button
                                                    negative
                                                    onClick={() => {
                                                        deleteTrash(overview.id, (res2) => {
                                                            if (res2.text === "Work deleted") {
                                                                this.setState({ deletedWork: this.state.deletedWork.filter(work => work.id !== overview.id) })
                                                            }
                                                        })
                                                    }}
                                                >
                                                    Slett Permanent
                                                </Button>
                                            </Button.Group>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                    <Modal
                        closeIcon
                        open={this.state.modalOpen}
                        onClose={() => this.setState({ modalOpen: false })}
                    >
                        <Header icon="comment" content="Kommentar" />
                        <Modal.Content>
                            <pre>
                                <p>
                                    {this.state.selectedComment}
                                </p>
                            </pre>
                        </Modal.Content>
                        {/* <Modal.Actions>
                        <Button color="red" onClick={() => this.setState({ modalOpen: false })} >
                            <Icon name="remove" /> Lukk
                        </Button>
                    </Modal.Actions> */}
                    </Modal>
                </Segment>
            </div>
        )
    }
}