import React, { Component } from 'react';

import { Segment, Sidebar, Menu, Icon } from 'semantic-ui-react'

export default class MySidebar extends Component {
    render() {
        const activeTab = this.props.activeTab

        return (
            <Sidebar.Pushable as={Segment} style={{ minHeight: "100vh", borderRadius: 0 }} onClick={() => this.props.onOpenProjectExplorerMenu(false)} >
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    direction="top"
                    width='thin'
                    visible={this.props.open}
                    icon='labeled'
                    vertical
                    inverted
                >
                    <Menu.Item
                        name='workTimer'
                        active={activeTab === "workTimer"}
                        onClick={() => {
                            this.props.onMenuClick("workTimer")
                            this.props.onOpenProjectExplorerMenu(false)
                        }}
                    >
                        <Icon name='time' />
                        Stemplingsur
                    </Menu.Item>
                    <Menu.Item
                        name='user'
                        active={activeTab === "user"}
                        onClick={() => {
                            this.props.onMenuClick("user")
                            this.props.onOpenProjectExplorerMenu(false)
                        }}
                    >
                        <Icon name='user' />
                        {this.props.username}
                    </Menu.Item>
                    <Menu.Item
                        name='overview'
                        active={activeTab === "overview"}
                        onClick={() => {
                            this.props.onMenuClick("overview")
                            this.props.onOpenProjectExplorerMenu(false)
                        }}
                    >
                        <Icon name='calendar' />
                        Oversikt
                    </Menu.Item>
                    {this.props.isAdmin &&
                        <Menu.Item
                            name='admin'
                            active={activeTab === "admin"}
                            onClick={() => {
                                this.props.onMenuClick("admin")
                                this.props.onOpenProjectExplorerMenu(false)
                            }}
                        >
                            <Icon name='user plus' />
                            Admin
                        </Menu.Item>
                    }
                    <Menu.Item
                        name='changeProject'
                        onClick={() => {
                            this.props.onChangeProjectClick()
                            this.props.onOpenProjectExplorerMenu(false)
                        }}
                    >
                        <Icon name='arrow left' />
                        Endre prosjekt
                    </Menu.Item>
                    <Menu.Item
                        name='logOut'
                        onClick={() => {
                            this.props.logOut()
                            this.props.onOpenProjectExplorerMenu(false)
                        }}
                    >
                        <Icon name='log out' />
                        Logg ut
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher>
                    <Segment basic>
                        {this.props.children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}