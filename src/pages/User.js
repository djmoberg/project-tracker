import React, { Component } from 'react';

import Add from './userOptions/Add'
import UserOverview from './userOptions/UserOverview'
import Settings from './userOptions/Settings'

import { Menu, Header, Segment } from 'semantic-ui-react'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activeTab: "add"
        }
    }

    componentDidMount() {
        // const activeTab = localStorage.getItem('activeUserTab')
        // if (activeTab)
        // 	this.setState({activeTab: activeTab})
    }

    handleMenuClick = (name) => {
        localStorage.setItem('activeUserTab', name)
        this.setState({ activeTab: name })
    }

    render() {
        return (
            <div>
                <Header as="h3" >Bruker: {this.props.user.username}</Header>
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
                    <Menu.Item
                        name='Innstillinger'
                        active={this.state.activeTab === "settings"}
                        onClick={() => this.handleMenuClick("settings")}
                    />
                </Menu>

                {this.state.activeTab === "add" &&
                    <Segment attached='bottom' >
                        <Add mode="add" header="Legg til arbeid" updateOverview={this.props.updateOverview} username={this.props.user.username} />
                    </Segment>
                }

                {this.state.activeTab === "userOverview" &&
                    <UserOverview overview={this.props.overview} username={this.props.user.username} updateOverview={this.props.updateOverview} />
                }

                {this.state.activeTab === "settings" &&
                    <Segment attached='bottom' >
                        <Settings updateOverview={this.props.updateOverview} />
                    </Segment>
                }

            </div>
        )
    }
}