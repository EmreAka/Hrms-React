import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import JobAdvertisement from '../services/jobAdvertisementService'
import {Icon, Button, Header, Item, Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function HrmsJobAdValidate() {

    const [jobAdvertisements, setJobAdvertisements] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisement()
        jobAdvertisementService.findAllByValidateFalseOrderByCreatedTimeDesc().then(result => setJobAdvertisements(result.data.data))
    }, [])

    function setValues(id, value) {
        let jobAdvertisementService = new JobAdvertisement()
        jobAdvertisementService.setValidateValue(id, value)
    }

    return (
        <div>
            <Card fluid>
                <Card.Content header = 'List of Jobs which need to be validated.'/>
                <Card.Content>
                    <Item.Group divided>
                        {
                            jobAdvertisements.map(jobAdvertisement => (
                                <Item key={jobAdvertisement.id}>
                                    <Item.Image size='small' src='https://res.cloudinary.com/emreaka/image/upload/v1624304366/job_o67inx.jpg' />
                                    <Item.Content>
                                        <Item.Header>{jobAdvertisement.employer.companyName}</Item.Header>
                                        <Item.Meta>
                                            <span className='price'>{jobAdvertisement.maxSalary} TL</span>
                                            <span className='stay'>{jobAdvertisement.city.cityName}</span>
                                        </Item.Meta>
                                        <Item.Description>{jobAdvertisement.description}</Item.Description>
                                        <Link to={`/jobs/${jobAdvertisement.id}`}>
                                            <Button animated color='black'>
                                                <Button.Content visible>Job's Details</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='arrow right' />
                                                </Button.Content>
                                            </Button>
                                        </Link>
                                        <Button animated='fade' color='green' onClick = {() => setValues(jobAdvertisement.id, true)}>
                                            <Button.Content visible>Accept Job Advertisement</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name='thumbs up' />
                                            </Button.Content>
                                        </Button>
                                    </Item.Content>
                                </Item>
                            ))
                        }
                    </Item.Group>
                </Card.Content>
            </Card>
        </div>
    )
}
