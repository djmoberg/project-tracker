import React, { Component } from 'react';

import Login from './pages/Login'
import RegisterUser from './pages/RegisterUser'
import ControlPanel from './pages/ControlPanel'

import { Header, Segment } from 'semantic-ui-react'

const request = require('superagent');

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			showRegister: false
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
					this.setState({ isLoggedIn: true, username: res.body.username })
				else
					this.setState({ isLoggedIn: false })
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
			return <ControlPanel logOut={this.logOut} username={this.state.username} />
		else if (this.state.showRegister && !this.state.isLoggedIn)
			return <RegisterUser onShowRegisterChange={this.handleShowRegisterChange} />
		else
			return <Login fetchIsLoggedIn={this.fetchIsLoggedIn} onShowRegisterChange={this.handleShowRegisterChange} />
	}

	render() {
		return (
			<div>
				<Segment basic inverted textAlign="center" >
					<Header as="h1">Project Tracker</Header>
				</Segment>
				<div className="App" >
					{this.router()}
				</div>
			</div>
		);
	}
}

export default App;
