import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

export default function SideBar() {
    return (
        <div>
            <Menu pointing vertical>
                <Menu.Item
                    name='Job Advertisements'
                />
                <Icon name="list alternate outline" />
                <Menu.Item
                    name='Employers'
                />
                <Icon name="list alternate outline" />
                <Menu.Item
                    name='Employee'
                />
                <Icon name="list alternate outline" />
            </Menu>
        </div>
    )
}
