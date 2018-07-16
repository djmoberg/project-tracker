import React, { Component } from 'react';

import ControlPanelMenu from '../menus/ControlPanelMenu'
import ChooseProject from './ChooseProject'
import RegisterProject from './RegisterProject'
import JoinProject from './JoinProject'
import ProjectExplorer from './ProjectExplorer'

import { Segment } from 'semantic-ui-react'

export default class RegisterUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentView: "chooseProject",
            selectedProject: 0
        }
    }

    componentWillMount() {
        const selectedProject = localStorage.getItem('selectedProject')
        if (selectedProject)
            this.handleProjectSelected(selectedProject)
    }

    handleMenuClick = (value) => {
        this.setState({ currentView: value })
    }

    handleProjectSelected = (value) => {
        this.setState({ currentView: "projectExplorer", selectedProject: value })
        this.props.onShowProjectExplorerMenuChange(true)
    }

    handleChangeProjectClick = () => {
        localStorage.removeItem("selectedProject")
        this.setState({ currentView: "chooseProject", selectedProject: 0 })
        this.props.onShowProjectExplorerMenuChange(false)
    }

    router() {
        if (this.state.currentView === "chooseProject")
            return <ChooseProject onProjectSelected={this.handleProjectSelected} />
        else if (this.state.currentView === "registerProject")
            return <RegisterProject onRegistered={this.handleMenuClick} />
        else if (this.state.currentView === "joinProject")
            return <JoinProject />
    }

    render() {
        if (this.state.currentView !== "projectExplorer")
            return (
                <div style={{ maxWidth: "1000px", margin: "0 auto" }} >
                    <ControlPanelMenu logOut={this.props.logOut} activeTab={this.state.currentView} onMenuClick={this.handleMenuClick} />
                    <Segment attached="bottom" >
                        {this.router()}
                    </Segment>
                </div>
            )
        else
            return (
                <React.Fragment>
                    <ProjectExplorer
                        logOut={this.props.logOut}
                        user={this.props.user}
                        selectedProject={this.state.selectedProject}
                        onChangeProjectClick={this.handleChangeProjectClick}
                        openProjectExplorerMenu={this.props.openProjectExplorerMenu}
                        onOpenProjectExplorerMenu={this.props.onOpenProjectExplorerMenu}
                    />
                </React.Fragment>
            )
    }
}