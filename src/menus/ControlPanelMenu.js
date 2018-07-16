import React, { Component } from 'react'

import { Menu } from 'semantic-ui-react'

export default class ControlPanelMenu extends Component {
    render() {
        const activeTab = this.props.activeTab

        return (
            <div>
                <Menu attached="top" tabular stackable>
                    <Menu.Item
                        name='Velg Prosjekt'
                        active={activeTab === "chooseProject"}
                        onClick={() => this.props.onMenuClick("chooseProject")}
                    />
                    <Menu.Item
                        name='Nytt Prosjekt'
                        active={activeTab === "registerProject"}
                        onClick={() => this.props.onMenuClick("registerProject")}
                    />
                    <Menu.Item
                        disabled
                        name='Finn Prosjekt'
                        active={activeTab === "joinProject"}
                        onClick={() => this.props.onMenuClick("joinProject")}
                    />
                    <Menu.Menu position='right'>
                        <Menu.Item
                            name='Logg ut'
                            active={activeTab === "logOut"}
                            onClick={() => this.props.logOut()}
                        />
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}