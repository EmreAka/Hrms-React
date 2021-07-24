import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import JobAdvertisement from '../services/jobAdvertisementService'
import {Icon, Header, Item, Card} from 'semantic-ui-react'

export default function JobAdvertisementDetail() {
    let { id } = useParams()

    const [jobAdvertisement, setJobAdvertisement] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisement()
        jobAdvertisementService.findByIdAndActiveTrueOrderByCreatedTimeDesc(id).then(result => setJobAdvertisement(result.data.data))
    }, [])
    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Job Details'/>
                <Card.Content>
                    <Item.Group>
                        <Item>
                            <Item.Image size='medium' src='https://res.cloudinary.com/emreaka/image/upload/v1624304366/job_o67inx.jpg' />
                            <Item.Content>
                                <Item.Header>{jobAdvertisement.employer?.companyName}</Item.Header>
                                <Item.Meta>Description</Item.Meta>
                                <Item.Description>{jobAdvertisement.description} in {jobAdvertisement.city?.cityName}</Item.Description>
                                <Item.Extra>Open Positions</Item.Extra>
                                <Item.Description>{jobAdvertisement.openPositions} position left</Item.Description>
                                <Item.Description>Deadline is in {jobAdvertisement.latestApplyTime}</Item.Description>
                                <Item.Extra>Work Type</Item.Extra>
                                <Item.Description>{jobAdvertisement.workPlace?.name}</Item.Description>
                                <Item.Extra>Work Time</Item.Extra>
                                <Item.Description>{jobAdvertisement.workTime?.name}</Item.Description>
                                <Item.Extra>Additional Details</Item.Extra>
                                <Item.Description>Salary is between {jobAdvertisement.maxSalary}TL and {jobAdvertisement.minSalary}TL</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Card.Content>

            </Card>

        </div>
    )
}
