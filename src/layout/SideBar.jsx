import React from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

export default function SideBar() {
    return (
        <div>
            <Menu pointing vertical color = 'grey' inverted>
                <Menu.Item as={NavLink} to="/jobs"
                           name='Job Advertisements'
                />
                
                <Menu.Item as={NavLink} to="/jobadd"
                           name='Job Add'
                />
                
                <Menu.Item as={NavLink} to="/employers"
                           name='Employers'
                />
                
                <Menu.Item as={NavLink} to={"/employees"}
                    name='Employees'
                />
                
            </Menu>
        </div>
    )
}
