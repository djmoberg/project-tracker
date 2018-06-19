import React, { Component } from 'react';
import { calculateHours, limitTo, uniqueUserList, uniqueYearList, getMonths } from '../utils'

import { Table, Dropdown, Form, Modal, Header } from 'semantic-ui-react'

// const request = require('superagent');

export default class Overview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            overview: [], //[{ id: 1, name: "Daniel", workDate: "2017-10-18T22:00:00.000Z", workFrom: "08:00", workTo: "13:00", comment: "Linje 1\nLinje2\nLinje 3" }]
            selectedUser: "Alle",
            // selectedMonth: new Date().getMonth().toString(),
            // selectedYear: new Date().getFullYear(),
            selectedMonth: "Alle",
            selectedYear: "Alle",
            totalHours: 0,
            modalOpen: false,
            selectedComment: ""
        }

        // this.fetchOverview()
    }

    componentWillMount() {
        this.setState({ overview: this.props.overview })
    }

    // fetchOverview() {
    //     request
    //         .get(process.env.REACT_APP_BACKEND + "overview")
    //         .then((res) => {
    //             this.setState({ overview: res.body })
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    isCurrentlySelected(overview) {
        return ((this.state.selectedUser === overview.name
            || this.state.selectedUser === "Alle")
            && (this.state.selectedMonth === (new Date(overview.workDate).getMonth()).toString()
                || this.state.selectedMonth === "Alle")
            && (this.state.selectedYear === (new Date(overview.workDate).getFullYear())
                || this.state.selectedYear === "Alle"))
    }

    filterOverview(overview) {
        return overview.filter(overview => {
            return this.isCurrentlySelected(overview)
        })
    }

    getTotalHours(overview) {
        let totalHours = 0

        for (let i = 0; i < overview.length; i++) {
            if (this.isCurrentlySelected(overview[i])) {
                totalHours += calculateHours(overview[i].workFrom, overview[i].workTo)
            }
        }

        return totalHours
    }

    render() {
        return (
            <div>
                <Header as="h3" >Oversikt: {this.state.selectedUser}</Header>

                <Header as="h4" >Timer total: {this.getTotalHours(this.state.overview)}</Header>

                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Bruker</label>
                            <Dropdown
                                placeholder="Bruker"
                                selection
                                value={this.state.selectedUser}
                                options={[{ text: "Alle", value: "Alle" }].concat(uniqueUserList(this.state.overview))}
                                onChange={(_, { value }) => this.setState({ selectedUser: value })}
                            />
                        </Form.Field>
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
                            <Table.HeaderCell>Navn</Table.HeaderCell>
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
                                    <Table.Cell>{overview.name}</Table.Cell>
                                    <Table.Cell>{new Date(overview.workDate).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{overview.workFrom} - {overview.workTo}</Table.Cell>
                                    <Table.Cell>{calculateHours(overview.workFrom, overview.workTo)}</Table.Cell>
                                    <Table.Cell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.setState({ modalOpen: true, selectedComment: overview.comment })}
                                    >
                                        {limitTo(overview.comment)}
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
            </div>
        );
    }
}