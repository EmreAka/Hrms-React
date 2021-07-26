import React, { useState, useEffect } from 'react'
import EmployerService from '../services/employerService'
import {Icon, Button, Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function EmployerList() {

    const [employers, setEmployer] = useState([])
    useEffect(() => {
        let employerService = new EmployerService()
        employerService.getEmployers().then(result => setEmployer(result.data.data))
    }
        , [])


    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Employer List'/>
                {employers.map(item => {
                    return <Card.Content>
                        <Card.Header>{item.companyName}</Card.Header>
                        <Card.Meta>{item.phoneNumber}</Card.Meta>
                        <Card.Description>
                            {item.webSite} <Link to={`/employers/${item.id}`}>
                                <Button floated = 'right' animated color = 'grey'>
                                    <Button.Content visible>View Job Advertisements</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
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
/*
<*/
