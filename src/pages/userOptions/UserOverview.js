import React, { Component } from 'react';

import Add from './Add'
// import GeneratePdf from '../GeneratePdf'
import { calculateHours, limitTo, uniqueYearList, getMonths } from '../../utils'
import { deleteWork, trashWork } from '../../APIish'

import { Segment, Header, Form, Dropdown, Table, Modal, Button } from 'semantic-ui-react'

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
    }

    componentWillMount() {
        this.setOverview()
    }

    setOverview() {
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

    handleEdit = (overview) => {
        this.setState({ editModalOpen: false, selectedWork: {} })
        this.props.updateOverview(overview)
        this.setOverview()
    }

    openEdit(overview) {
        this.setState({ editModalOpen: true, selectedWork: overview })
    }

    render() {
        return (
            <Segment attached='bottom' >
                <Header as="h4" >Oversikt Bruker</Header>
                {/* <GeneratePdf overview={this.state.overview} selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} wage={100} /> */}
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

                <Table celled selectable>
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
                                <Table.Row
                                    key={index}
                                // onClick={() => {
                                //     this.setState({ editModalOpen: true, selectedWork: overview })
                                // }} 
                                >
                                    <Table.Cell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { this.openEdit(overview) }}
                                    >{new Date(overview.workDate).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { this.openEdit(overview) }}
                                    >{overview.workFrom} - {overview.workTo}</Table.Cell>
                                    <Table.Cell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => { this.openEdit(overview) }}
                                    >{calculateHours(overview.workFrom, overview.workTo)}</Table.Cell>
                                    <Table.Cell
                                        style={{ cursor: "pointer" }}
                                        onClick={() => this.setState({ modalOpen: true, selectedComment: overview.comment })}
                                    >
                                        {limitTo(overview.comment)}
                                    </Table.Cell>
                                    <Table.Cell collapsing>
                                        <Button.Group basic size="small">
                                            <Button icon="edit" onClick={() => {
                                                this.openEdit(overview)
                                            }} />
                                            <Button icon="delete" onClick={() => {
                                                trashWork(overview, (res) => {
                                                    if (res.text === "Work moved")
                                                        deleteWork(overview.id, (res) => {
                                                            if (res.body.status === "Work deleted") {
                                                                this.props.updateOverview(res.body.overview)
                                                                this.setOverview()
                                                            }
                                                        })
                                                })
                                            }} />
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
                        <Add mode="edit" header="Rediger arbeid" work={this.state.selectedWork} handleEdit={this.handleEdit} />
                        {/* <Button negative >Slett</Button> */}
                    </Modal.Content>
                    {/* <Modal.Actions>
                        <Button color="red" onClick={() => this.setState({ modalOpen: false })} >
                            <Icon name="remove" /> Lukk
                        </Button>
                    </Modal.Actions> */}
                </Modal>
            </Segment>
        )
    }
}