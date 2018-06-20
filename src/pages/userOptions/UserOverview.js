import React, { Component } from 'react';

import Add from './Add'
import { calculateHours, limitTo, uniqueYearList, getMonths } from '../../utils'

import { Segment, Header, Form, Dropdown, Table, Modal, Button, Icon } from 'semantic-ui-react'

export default class UserOverview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            overview: [],
            selectedMonth: "Alle",
            selectedYear: "Alle",
            modalOpen: false,
            selectedComment: "",
            editModalOpen: false,
            selectedWork: {}
        }

        // this.fetchOverview()
    }

    componentWillMount() {
        let fOverview = this.props.overview.filter(overview => {
            if (overview.name === this.props.username)
                return overview
            else
                return null
        })

        this.setState({ overview: fOverview })
    }

    isCurrentlySelected(overview) {
        return ((this.state.selectedMonth === (new Date(overview.workDate).getMonth()).toString()
            || this.state.selectedMonth === "Alle")
            && (this.state.selectedYear === (new Date(overview.workDate).getFullYear())
                || this.state.selectedYear === "Alle"))
    }

    filterOverview(overview) {
        return overview.filter(overview => {
            return this.isCurrentlySelected(overview)
        })
    }

    render() {
        return (
            <Segment attached='bottom' >
                <Header as="h4" >Oversikt Bruker</Header>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Måned</label>
                            <Dropdown
                                placeholder="Måned"
                                selection
                                value={this.state.selectedMonth}
                                options={[{ text: "Alle", value: "Alle" }].concat(getMonths())}
                                onChange={(_, { value }) => this.setState({ selectedMonth: value })}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>År</label>
                            <Dropdown
                                placeholder="År"
                                selection
                                value={this.state.selectedYear}
                                options={[{ text: "Alle", value: "Alle" }].concat(uniqueYearList(this.state.overview))}
                                onChange={(_, { value }) => this.setState({ selectedYear: value })}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>

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
                            this.filterOverview(this.state.overview).map((overview, index) =>
                                <Table.Row key={index} >
                                    <Table.Cell>{new Date(overview.workDate).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{overview.workFrom} - {overview.workTo}</Table.Cell>
                                    <Table.Cell>{calculateHours(overview.workFrom, overview.workTo)}</Table.Cell>
                                    <Table.Cell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.setState({ modalOpen: true, selectedComment: overview.comment })}
                                    >
                                        {limitTo(overview.comment)}
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        <Button.Group basic size="small">
                                            <Button icon="edit" onClick={() => {
                                                this.setState({ editModalOpen: true, selectedWork: overview })
                                            }} />
                                            <Button icon="delete" />
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
                <Modal
                    closeIcon
                    open={this.state.editModalOpen}
                    onClose={() => this.setState({ editModalOpen: false })}
                >
                    <Header icon="edit" content="Rediger" />
                    <Modal.Content>
                        <Add mode="edit" header="Rediger arbeid" work={this.state.selectedWork} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="red" onClick={() => this.setState({ modalOpen: false })} >
                            <Icon name="remove" /> Lukk
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Segment>
        )
    }
}