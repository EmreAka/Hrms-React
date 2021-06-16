import React from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

export default function SideBar() {
    return (
        <div>
            <Menu pointing vertical>
                <Menu.Item as={NavLink} to="/jobs"
                           name='Job Advertisements'
                />
                <Icon name="list alternate outline"/>
                <Menu.Item as={NavLink} to="/jobadd"
                           name='Job Add'
                />
                <Icon name="list alternate outline"/>
                <Menu.Item as={NavLink} to="/employers"
                           name='Employers'
                />
                <Icon name="list alternate outline"/>
                <Menu.Item as={NavLink} to={"/employees"}
                    name='Employees'
                />
                <Icon name="list alternate outline"/>
            </Menu>
        </div>
    )
}
