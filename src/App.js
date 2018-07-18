import React, { Component } from 'react';

import Login from './pages/Login'
import RegisterUser from './pages/RegisterUser'
import ControlPanel from './pages/ControlPanel'
import { isLoggedIn, logOut } from './APIish'

import { Segment, Loader, Dimmer, Button, Responsive, Grid, Image } from 'semantic-ui-react'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			showRegister: false,
			renderPage: false,
			user: {},
			openProjectExplorerMenu: false,
			showProjectExplorerMenu: false
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

	handleShowProjectExplorerMenuChange = (value) => {
		this.setState({ showProjectExplorerMenu: value })
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
					onShowProjectExplorerMenuChange={this.handleShowProjectExplorerMenuChange}
				/>
			)
		else if (this.state.showRegister && !this.state.isLoggedIn)
			return <RegisterUser onShowRegisterChange={this.handleShowRegisterChange} />
		else
			return <Login fetchIsLoggedIn={this.fetchIsLoggedIn} onShowRegisterChange={this.handleShowRegisterChange} />
	}

	renderContent() {
		if (this.state.renderPage)
			return (
				<div className="App" >
					{this.router()}
				</div>
			)
		else
			return (
				<Segment style={{ marginTop: "50px" }} basic>
					<Dimmer active inverted>
						<Loader indeterminate content="Venter på svar..." />
					</Dimmer>
				</Segment>
			)
	}

	render() {
		return (
			<div>
				<div style={{ backgroundColor: "black" }} >
					<Grid padded >
						<Grid.Row>
							<Grid.Column width="4" >

							</Grid.Column>
							<Grid.Column verticalAlign='middle' width="8" textAlign="center" >
								{/* <Header as="h1" textAlign="center" style={{ color: "white" }} >Project Tracker</Header> */}
								<Image src="https://facelex.com/img/cooltext292638607517631.png" centered />
							</Grid.Column>
							<Grid.Column width="4" textAlign="right" >
								{this.state.showProjectExplorerMenu &&
									<Responsive maxWidth={1000}>
										<Button
											size="big"
											color="black"
											icon="bars"
											onClick={() => this.handleOpenProjectExplorerMenu(!this.state.openProjectExplorerMenu)}
										/>
									</Responsive>
								}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
				{this.renderContent()}
			</div>
		)
	}
}

export default App;
