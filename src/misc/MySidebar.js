import React, { Component } from 'react';

import { Segment, Sidebar, Menu, Icon } from 'semantic-ui-react'

export default class MySidebar extends Component {
    render() {
        const activeTab = this.props.activeTab

        return (
            <Sidebar.Pushable as={Segment} style={{ minHeight: "100vh" }} >
                <Sidebar
                    as={Menu}
                    animation='push'
                    width='thin'
                    visible={true}
                    icon='labeled'
                    vertical
                    inverted
                >
                    <Menu.Item
                        name='user'
                        active={activeTab === "user"}
                        onClick={() => this.props.onMenuClick("user")}
                    >
                        <Icon name='user' />
                        Bruker
                    </Menu.Item>
                    <Menu.Item
                        name='overview'
                        active={activeTab === "overview"}
                        onClick={() => this.props.onMenuClick("overview")}
                    >
                        <Icon name='calendar' />
                        Oversikt
                    </Menu.Item>
                    {this.props.isAdmin &&
                        <Menu.Item
                            name='admin'
                            active={activeTab === "admin"}
                            onClick={() => this.props.onMenuClick("admin")}
                        >
                            <Icon name='user plus' />
                            Admin
                        </Menu.Item>
                    }
                    <Menu.Item
                        name='changeProject'
                        onClick={() => this.props.onChangeProjectClick()}
                    >
                        <Icon name='arrow left' />
                        Endre prosjekt
                    </Menu.Item>
                    <Menu.Item
                        name='logOut'
                        onClick={() => this.props.logOut()}
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