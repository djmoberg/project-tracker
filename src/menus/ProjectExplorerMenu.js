import React, { Component } from 'react'

import { Menu, Dropdown } from 'semantic-ui-react'

export default class ProjectExplorerMenu extends Component {
    render() {
        const activeTab = this.props.activeTab

        return (
            <div>
                <Menu pointing secondary stackable>
                    <Menu.Item
                        name='Bruker'
                        active={activeTab === "user"}
                        onClick={() => this.props.onMenuClick("user")}
                    />
                    <Menu.Item
                        name='Oversikt'
                        active={activeTab === "overview"}
                        onClick={() => this.props.onMenuClick("overview")}
                    />
                    {this.props.isAdmin &&
                        <Menu.Item
                            name='Admin'
                            active={activeTab === "admin"}
                            onClick={() => this.props.onMenuClick("admin")}
                        />
                    }
                    <Menu.Menu position='right'>
                        <Dropdown item text='Valg'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.props.onChangeProjectClick()} >Endre Prosjekt</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* <Menu.Item
                            name="Endre Prosjekt"
                            onClick={() => this.props.onChangeProjectClick()}
                        /> */}
                        <Menu.Item
                            name="Logg ut"
                            onClick={() => this.props.logOut()}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}