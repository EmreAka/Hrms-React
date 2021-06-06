import React from 'react'
import JobAdvertisementList from '../pages/JobAdvertisementList'
import SideBar from './SideBar'
import { Grid } from 'semantic-ui-react'

export default function Dashboard() {
    return (
        <div>

            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <SideBar />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <JobAdvertisementList />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </div>
    )
}
