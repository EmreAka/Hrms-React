import React from 'react'
import JobAdvertisementList from '../pages/JobAdvertisementList'
import SideBar from './SideBar'
import { Grid } from 'semantic-ui-react'
import EmployerList from '../pages/EmployerList'
import { Route } from 'react-router'
import EmployeeList from "../pages/EmployeeList";
import EmployeeViewCvs from '../pages/EmployeeViewCvs'
import EmployeeCv from '../pages/EmployeeCv'

export default function Dashboard() {
    return (
        <div>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <SideBar />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Route exact path ={"/jobs"} component = {JobAdvertisementList}/>
                        <Route exact path = {"/employers"} component={EmployerList}/>
                        <Route exact path = {"/employees"} component={EmployeeList}/>
                        <Route exact path = {"/employees/:id"} component={EmployeeViewCvs}/>
                        <Route exact path = {"/employees/:id/:cvId"} component={EmployeeCv}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}
