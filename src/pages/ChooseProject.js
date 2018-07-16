import React, { Component } from 'react';

import { getProjects } from '../APIish'

import { Header, List } from 'semantic-ui-react'

export default class RegisterUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: [],
            // selectedProject: ""
        }
    }

    componentWillMount() {
        getProjects((res) => {
            let projects = []

            res.body.forEach((project) => {
                projects.push({ text: project.name, value: project.id })
            })

            this.setState({ projects })
        })
    }

    // handleSelectedProjectChange = (_, { name, value }) => this.setState({ selectedProject: value })
    handleSelectedProjectChange2 = (value) => this.props.onProjectSelected(value)

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center", marginBottom: "32px" }} >Velg Prosjekt</Header>

                <List relaxed="very" celled selection size="big" >
                    {this.state.projects.map(project =>
                        <List.Item key={project.value} onClick={() => this.handleSelectedProjectChange2(project.value)} >
                            <List.Content style={{textAlign: "center"}} >
                                <List.Header>{project.text}</List.Header>
                            </List.Content>
                        </List.Item>
                    )}
                </List>

                {/* <Form>
                    <Form.Dropdown
                        fluid
                        selection
                        value={this.state.selectedProject}
                        options={this.state.projects}
                        onChange={this.handleSelectedProjectChange}
                    />
                    <Form.Button
                        fluid
                        color="red"
                        onClick={() => this.props.onProjectSelected(this.state.selectedProject)}
                    >
                        Velg
                    </Form.Button>
                    <Form.Button
                        fluid
                        color="red"
                    >
                        Nytt Prosjekt
                    </Form.Button>
                    <Form.Button
                        fluid
                        color="black"
                    >
                        Bli med i prosjekt
                    </Form.Button>
                </Form> */}
            </div>
        )
    }
}