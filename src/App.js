import React, { Component } from 'react';

import Login from './pages/Login'
import RegisterUser from './pages/RegisterUser'
import ControlPanel from './pages/ControlPanel'
import { isLoggedIn, logOut } from './APIish'

import { Header, Segment, Loader, Dimmer, Button, Responsive } from 'semantic-ui-react'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			showRegister: false,
			renderPage: false,
			user: {},
			openProjectExplorerMenu: false
		}
	}

	componentWillMount() {
		this.fetchIsLoggedIn()
	}

	fetchIsLoggedIn = () => {
		isLoggedIn((res) => {
			if (res.body.loggedIn)
				this.setState({ isLoggedIn: true, user: res.body.user, renderPage: true })
			else
				this.setState({ isLoggedIn: false, renderPage: true })
		})
	}

	logOut = () => {
		logOut((res) => {
			localStorage.removeItem("selectedProject")
			window.location.reload()
		})
	}

	handleShowRegisterChange = (value) => {
		this.setState({ showRegister: value })
	}

	handleOpenProjectExplorerMenu = (value) => {
		this.setState({ openProjectExplorerMenu: value })
	}

	router() {
		if (this.state.isLoggedIn)
			return (
				<ControlPanel
					logOut={this.logOut}
					user={this.state.user}
					openProjectExplorerMenu={this.state.openProjectExplorerMenu}
					onOpenProjectExplorerMenu={this.handleOpenProjectExplorerMenu}
				/>
			)
		else if (this.state.showRegister && !this.state.isLoggedIn)
			return <RegisterUser onShowRegisterChange={this.handleShowRegisterChange} />
		else
			return <Login fetchIsLoggedIn={this.fetchIsLoggedIn} onShowRegisterChange={this.handleShowRegisterChange} />
	}

	render() {
		if (this.state.renderPage)
			return (
				<div>
					<Segment basic inverted >
						<Header as="h1" textAlign="center" >Project Tracker</Header>
						<Responsive maxWidth={1000}>
							<Button
								size="big"
								color="black"
								icon="bars"
								onClick={() => this.handleOpenProjectExplorerMenu(!this.state.openProjectExplorerMenu)}
							/>
						</Responsive>
					</Segment>
					<div className="App" >
						{this.router()}
					</div>
				</div>
			)
		else
			return (
				<div>
					<Segment basic inverted textAlign="center" >
						<Header as="h1">Project Tracker</Header>
					</Segment>
					<Segment style={{ marginTop: "50px" }} basic>
						<Dimmer active inverted>
							<Loader />
						</Dimmer>
					</Segment>
				</div>
			)
	}
}

export default App;
