import React, { useEffect, useState } from 'react'
import EmployeeService from "../services/employeeService";
import { Button, Header, Icon, Table } from "semantic-ui-react";
import { Link } from 'react-router-dom';
export default function EmployeeList() {

    const [employees, setEmployees] = useState([])
    useEffect(() => {
        let employeeService = new EmployeeService()
        employeeService.getEmployees().then(result => setEmployees(result.data.data))
    }, [])

    return (
        <div>
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Employee List</Header.Content>
            </Header>
            <Table celled color='grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Birth Year</Table.HeaderCell>
                        <Table.HeaderCell>View Cvs</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employees.map(employee => (
                            <Table.Row key={employee.id}>
                                <Table.Cell>{employee.firstName}</Table.Cell>
                                <Table.Cell>{employee.lastName}</Table.Cell>
                                <Table.Cell>{employee.birthYear}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/employees/${employee.id}`}>
                                        <Button animated color='black'>
                                            <Button.Content visible>View Cvs</Button.Content>
                                            <Button.Content hidden><Icon name='arrow right' /></Button.Content>
                                        </Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}
