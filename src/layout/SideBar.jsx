import React from 'react'
import { Menu } from 'semantic-ui-react'

export default function SideBar() {
    return (
        <div>
            <Menu pointing vertical>
                <Menu.Item
                    name='Job Advertisements'
                />
                <Menu.Item
                    name='Employers'
                />
                <Menu.Item
                    name='Employee'
                />
            </Menu>
        </div>
    )
}
