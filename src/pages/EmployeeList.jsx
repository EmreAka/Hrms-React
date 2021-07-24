import React, { useEffect, useState } from 'react'
import EmployeeService from "../services/employeeService";
import {Button, Card, Icon} from "semantic-ui-react";
import { Link } from 'react-router-dom';
export default function EmployeeList() {

    const [employees, setEmployees] = useState([])
    useEffect(() => {
        let employeeService = new EmployeeService()
        employeeService.getEmployees().then(result => setEmployees(result.data.data))
    }, [])

    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Employee List'/>
                {employees.map(item => {
                    return <Card.Content>
                        <Card.Header>{item.firstName} {item.lastName}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{item.birthYear}</span>
                        </Card.Meta>
                        <Card.Description>
                            <Link to={`/employees/${item.id}`}>
                                <Button floated = 'right' animated color='black'>
                                    <Button.Content visible>View Cvs</Button.Content>
                                    <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                </Button>
                            </Link>
                        </Card.Description>
                    </Card.Content>
                })}

            </Card>
        </div>
    )
}
