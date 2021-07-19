import React from 'react'
import JobAdvertisementList from '../pages/JobAdvertisementList'
import SideBar from './SideBar'
import { Grid } from 'semantic-ui-react'
import EmployerList from '../pages/EmployerList'
import { Route } from 'react-router'
import EmployeeList from "../pages/EmployeeList";
import EmployeeViewCvs from '../pages/EmployeeViewCvs'
import EmployeeCv from '../pages/EmployeeCv'
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail'
import EmployerDetails from '../pages/EmployerDetails'
import JobPosting from '../pages/JobPosting'
import HrmsJobAdValidate from '../pages/HrmsJobAdValidate'
import FavoriteJobAdvertisement from "../pages/FavoriteJobAdvertisements";
import {ToastContainer} from "react-toastify";
import CvPosting from "../pages/CvPosting";
import EducationPosting from "../pages/EducationPosting";
import ExperiencePosting from "../pages/ExperiencePosting";

export default function Dashboard() {
    return (
        <div>
            <ToastContainer position = 'top-center'></ToastContainer>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <SideBar />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Route exact path = {"/jobs"} component = {JobAdvertisementList}/>
                        <Route exact path = {"/jobs/:id"} component = {JobAdvertisementDetail}/>
                        <Route exact path = {"/employers"} component ={EmployerList}/>
                        <Route exact path = {"/employers/:id"} component ={EmployerDetails}/>
                        <Route exact path = {"/employees"} component = {EmployeeList}/>
                        <Route exact path = {"/employees/:id"} component = {EmployeeViewCvs}/>
                        <Route exact path = {"/employees/:id/:cvId"} component = {EmployeeCv}/>
                        <Route exact path = {"/jobadd"} component = {JobPosting}/>
                        <Route exact path = {"/hrms/validateJobAds"} component = {HrmsJobAdValidate}/>
                        <Route exact path = {"/favorites"} component = {FavoriteJobAdvertisement}/>
                        <Route exact path = {"/cvadd"} component = {CvPosting}/>
                        <Route exact path = {"/educationadd/:cvId"} component = {EducationPosting}/>
                        <Route exact path = {"/experienceadd/:cvId"} component = {ExperiencePosting}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}
