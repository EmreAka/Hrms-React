import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvService from '../services/cvService'
import {Button, Card, Header, Icon, Item} from "semantic-ui-react";
import { Link } from 'react-router-dom';

export default function EmployeeViewCv() {

    let { id } = useParams()

    const [employeeCvs, setEmployeeCvs] = useState([])
    useEffect(() => {
        let cvService = new CvService()
        cvService.getCvsByEmployeeId(id).then(result => setEmployeeCvs(result.data.data))
    }, [])

    return (
        <div>
            <Card fluid>
                <Card.Content header = 'Employee Cv List'/>
                <Card.Content>
                    <Item.Group divided>
                        {
                            employeeCvs.map(cv => (
                                <Item key = {cv.id}>
                                    <Item.Image size='small' src={cv.photo} />
                                    <Item.Content>
                                        <Item.Header as='a'>{cv.employee.firstName} {cv.employee.lastName}</Item.Header>
                                        <Item.Meta>Description</Item.Meta>
                                        <Item.Description>
                                            {cv.description}
                                        </Item.Description>
                                        <Link to={`/employees/${id}/${cv.id}`}>
                                            <Button floated = 'right' animated color='grey'>
                                                <Button.Content visible>Cv's Details</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name='arrow right' />
                                                </Button.Content>
                                            </Button>
                                        </Link>
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
