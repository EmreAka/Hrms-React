import React from 'react'
import {Menu} from 'semantic-ui-react'
import {NavLink} from "react-router-dom";

export default function SideBar() {
    return (
        <div>
            <Menu style = {{marginTop: "4.9em"}} fixed = 'left' pointing vertical color = 'black'>
                <Menu.Item as={NavLink} to="/jobs"
                           name='Job Advertisements'
                />
                
                <Menu.Item as={NavLink} to="/jobadd"
                           name='Job Add'
                />

                <Menu.Item as={NavLink} to="/cvadd"
                           name='Add Cv'
                />

                <Menu.Item as={NavLink} to="/employers"
                           name='Employers'
                />
                
                <Menu.Item as={NavLink} to={"/employees"}
                    name='Employees'
                />

                <Menu.Item as={NavLink} to={"/hrms/validateJobAds"}
                    name='Validate Jobs'
                />
            </Menu>
        </div>
    )
}
