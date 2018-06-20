import React, { Component } from 'react';

import { Segment, Sidebar, Menu, Icon } from 'semantic-ui-react'

export default class MySidebar extends Component {
    render() {
        return (
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    as={Menu}
                    animation='push'
                    width='thin'
                    visible={true}
                    icon='labeled'
                    vertical
                    inverted
                >
                    <Menu.Item name='home'>
                        <Icon name='user' />
                        Bruker
                    </Menu.Item>
                    <Menu.Item name='gamepad'>
                        <Icon name='calendar' />
                        Oversikt
                    </Menu.Item>
                    <Menu.Item name='camera'>
                        <Icon name='user plus' />
                        Admin
                    </Menu.Item>
                    <Menu.Item name='camera'>
                        <Icon name='arrow left' />
                        Endre prosjekt
                    </Menu.Item>
                    <Menu.Item name='camera'>
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