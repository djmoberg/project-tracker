import React, { Component } from 'react';

// import ProjectExplorerMenu from '../menus/ProjectExplorerMenu'
import User from './User'
import Overview from './Overview'
import Admin from './Admin'
import WorkTimer from './WorkTimer'
import MySidebar from '../misc/MySidebar'
import MySidebar2 from '../misc/MySidebar2'
import { getProject } from '../APIish'

import { Header, Responsive } from 'semantic-ui-react'

export default class ProjectExplorer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "user",
            project: {
                name: "",
                overview: []
            },
            isAdmin: false
        }
    }

    componentWillMount() {
        this.fetchProject(this.props.selectedProject)
    }

    componentDidMount() {
        // const activeTab = localStorage.getItem('activeTab')
        // if (activeTab)
        //     this.setState({ activeTab: activeTab })

        let isAdmin = this.props.user.isAdmin.some(id => {
            return parseInt(id, 10) === parseInt(this.props.selectedProject, 10)
        })

        this.setState({ isAdmin })
    }

    fetchProject(projectId) {
        getProject(projectId, (res) => {
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
                return <User user={this.props.user} overview={this.state.project.overview} updateOverview={this.updateOverview} />
            case "overview":
                return <Overview overview={this.state.project.overview} />
            case "admin":
                return <Admin user={this.props.user} />
            case "workTimer":
                return <WorkTimer />
            default:
                break;
        }
    }

    render() {
        return (
            <div>
                {/* <Header as="h2" style={{ textAlign: "center" }} >{this.state.project.name}</Header>
                <ProjectExplorerMenu
                    logOut={this.props.logOut}
                    activeTab={this.state.activeTab}
                    onMenuClick={this.handleMenuClick}
                    onChangeProjectClick={this.props.onChangeProjectClick}
                    isAdmin={this.state.isAdmin}
                />
                <Segment>
                    {this.renderPage(this.state.activeTab)}
                </Segment> */}
                <Responsive minWidth={1001}>
                    <MySidebar2
                        logOut={this.props.logOut}
                        activeTab={this.state.activeTab}
                        onMenuClick={this.handleMenuClick}
                        onChangeProjectClick={this.props.onChangeProjectClick}
                        isAdmin={this.state.isAdmin}
                        username={this.props.user.username}
                    >
                        <Header as="h2" >Prosjekt: {this.state.project.name}</Header>
                        {/* <Segment> */}
                        {this.renderPage(this.state.activeTab)}
                        {/* </Segment> */}
                    </MySidebar2>
                </Responsive>
                <Responsive maxWidth={1000}>
                    <MySidebar
                        logOut={this.props.logOut}
                        activeTab={this.state.activeTab}
                        onMenuClick={this.handleMenuClick}
                        onChangeProjectClick={this.props.onChangeProjectClick}
                        isAdmin={this.state.isAdmin}
                        username={this.props.user.username}
                        open={this.props.openProjectExplorerMenu}
                        onOpenProjectExplorerMenu={this.props.onOpenProjectExplorerMenu}
                    >
                        <Header as="h2" >Prosjekt: {this.state.project.name}</Header>
                        {/* <Segment> */}
                        {this.renderPage(this.state.activeTab)}
                        {/* </Segment> */}
                    </MySidebar>
                </Responsive>
            </div>
        )
    }
}