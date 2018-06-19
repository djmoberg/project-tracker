import React, { Component } from 'react';
import Add from './userOptions/Add'
import UserOverview from './userOptions/UserOverview'

import { Menu, Header } from 'semantic-ui-react'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "add"
        }
    }

    componentDidMount() {
		const activeTab = localStorage.getItem('activeUserTab')
		if (activeTab)
        	this.setState({activeTab: activeTab})
    }

    handleMenuClick = (name) => {
        localStorage.setItem('activeUserTab', name)
        this.setState({ activeTab: name })
    }

    render() {
        return (
            <div>
                <Header as="h3" >Bruker: {this.props.username}</Header>
                <Menu attached='top' >
                    <Menu.Item
                        name='Legg til'
                        active={this.state.activeTab === "add"}
                        onClick={() => this.handleMenuClick("add")}
                    />
                    <Menu.Item
                        name='Oversikt bruker'
                        active={this.state.activeTab === "userOverview"}
                        onClick={() => this.handleMenuClick("userOverview")}
                    />
                </Menu>

                {this.state.activeTab === "add" &&
                    <Add />
                }

                {this.state.activeTab === "userOverview" &&
                    <UserOverview />
                }

            </div>
        )
    }
}