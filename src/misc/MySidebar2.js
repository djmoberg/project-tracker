import React, { Component } from 'react';

import { Grid, Menu, Segment, Icon } from 'semantic-ui-react'

export default class MySidebar extends Component {
    render() {
        const activeTab = this.props.activeTab

        return (
            <Grid>
                <Grid.Column width={2}>
                    <Menu fluid vertical inverted icon='labeled' style={{ minHeight: "100vh", borderRadius: 0 }}>
                        <Menu.Item
                            name='workTimer'
                            active={activeTab === "workTimer"}
                            onClick={() => this.props.onMenuClick("workTimer")}
                        >
                            <Icon name='time' />
                            Stemplingsur
                        </Menu.Item>
                        <Menu.Item
                            name='user'
                            active={activeTab === "user"}
                            onClick={() => this.props.onMenuClick("user")}
                        >
                            <Icon name='user' />
                            {this.props.username}
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
                    </Menu>
                </Grid.Column>
                <Grid.Column stretched width={14}>
                    <Segment basic>
                        {this.props.children}
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}