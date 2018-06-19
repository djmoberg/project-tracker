import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class ProjectExplorerMenu extends Component {
    render() {
        const activeTab = this.props.activeTab

        return (
            <div>
                <Menu pointing secondary>
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
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name="Endre Prosjekt"
                            onClick={() => this.props.onChangeProjectClick()}
                        />
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