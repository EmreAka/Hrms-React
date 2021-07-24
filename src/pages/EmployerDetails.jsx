import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import JobAdvertisement from '../services/jobAdvertisementService'
import {Icon, Button, Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function EmployerDetails() {
    let { id } = useParams()

    const [jobAdvertisements, setJobAdvertisements] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisement()
        jobAdvertisementService.findAllByEmployerIdAndActiveTrue(id).then(result => setJobAdvertisements(result.data.data))
    }, [])


    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = "Employer's Job Advertisements"/>
                {jobAdvertisements.map(item => {
                    return <Card.Content>
                        <Card.Header>{item.employer?.companyName}</Card.Header>
                        <Card.Description>
                            {item.description}
                            <Link to={`/jobs/${item.id}`}>
                            <Button floated = 'right' animated color = 'black'>
                                <Button.Content visible>View</Button.Content>
                                <Button.Content hidden><Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                        </Link>
                        </Card.Description>
                    </Card.Content>
                })}
            </Card>
        </div>
    )
}