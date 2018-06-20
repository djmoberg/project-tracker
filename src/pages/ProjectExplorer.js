import React, { Component } from 'react';

import ProjectExplorerMenu from '../menus/ProjectExplorerMenu'
import User from './User'
import Overview from './Overview'

import { Segment, Header } from 'semantic-ui-react'

const request = require('superagent');

export default class ProjectExplorer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "user",
            project: {
                name: "",
                overview: []
            }
        }
    }

    componentWillMount() {
        this.fetchProject(this.props.selectedProject)
    }

    componentDidMount() {
        // const activeTab = localStorage.getItem('activeTab')
        // if (activeTab)
        //     this.setState({ activeTab: activeTab })
    }

    fetchProject(projectId) {
        request
            .get(process.env.REACT_APP_BACKEND + "project/" + projectId)
            .withCredentials()
            .then((res) => {
                this.setState({ project: res.body })
                localStorage.setItem('selectedProject', this.props.selectedProject)
            })
    }

    updateOverview = (overview) => {
        this.setState({ project: { name: this.state.project.name, overview } })
    }

    handleMenuClick = (name) => {
        localStorage.setItem('activeTab', name)
        this.setState({ activeTab: name })
    }

    renderPage(name) {
        switch (name) {
            case "user":
                return <User username={this.props.username} overview={this.state.project.overview} updateOverview={this.updateOverview} />
            case "overview":
                return <Overview overview={this.state.project.overview} />
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                <Header as="h2" style={{ textAlign: "center" }} >{this.state.project.name}</Header>
                <ProjectExplorerMenu
                    logOut={this.props.logOut}
                    activeTab={this.state.activeTab}
                    onMenuClick={this.handleMenuClick}
                    onChangeProjectClick={this.props.onChangeProjectClick}
                />
                <Segment>
                    {this.renderPage(this.state.activeTab)}
                </Segment>
            </div>
        )
    }
}