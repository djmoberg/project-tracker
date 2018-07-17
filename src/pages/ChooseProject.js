import React, { Component } from 'react';

import { Header, List } from 'semantic-ui-react'

export default class RegisterUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            projects: []
        }
    }

    handleSelectedProjectChange2 = (value) => this.props.onProjectSelected(value)

    render() {
        return (
            <div style={{ maxWidth: "300px", margin: "0 auto" }} >
                <Header as="h2" style={{ textAlign: "center", marginBottom: "32px" }} >Velg Prosjekt</Header>
                <List relaxed="very" celled selection size="big" >
                    {this.props.projects.map(project =>
                        <List.Item key={project.value} onClick={() => this.handleSelectedProjectChange2(project.value)} >
                            <List.Content style={{ textAlign: "center" }} >
                                <List.Header>{project.text}</List.Header>
                            </List.Content>
                        </List.Item>
                    )}
                </List>
            </div>
        )
    }
}