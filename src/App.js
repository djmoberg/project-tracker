import React, { Component } from 'react';

import Login from './pages/Login'
import RegisterUser from './pages/RegisterUser'
import ControlPanel from './pages/ControlPanel'

import { Header, Segment, Loader, Dimmer } from 'semantic-ui-react'

const request = require('superagent');

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			showRegister: false,
			renderPage: false,
			user: {}
		}
	}

	componentWillMount() {
		this.fetchIsLoggedIn()
	}

	fetchIsLoggedIn = () => {
		request
			.get(process.env.REACT_APP_BACKEND + "authenticate/loggedIn")
			.withCredentials()
			.then((res) => {
				console.log(res)
				if (res.body.loggedIn)
					this.setState({ isLoggedIn: true, user: res.body.user, renderPage: true })
				else
					this.setState({ isLoggedIn: false, renderPage: true })
			})
	}

	logOut = () => {
		request
			.get(process.env.REACT_APP_BACKEND + "authenticate/logout")
			.withCredentials()
			.then((res) => {
				window.location.reload()
			})
	}

	handleShowRegisterChange = (value) => {
		this.setState({ showRegister: value })
	}

	router() {
		if (this.state.isLoggedIn)
			return <ControlPanel logOut={this.logOut} user={this.state.user} />
		else if (this.state.showRegister && !this.state.isLoggedIn)
			return <RegisterUser onShowRegisterChange={this.handleShowRegisterChange} />
		else
			return <Login fetchIsLoggedIn={this.fetchIsLoggedIn} onShowRegisterChange={this.handleShowRegisterChange} />
	}

	render() {
		if (this.state.renderPage)
			return (
				<div>
					<Segment basic inverted textAlign="center" >
						<Header as="h1">Project Tracker</Header>
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
