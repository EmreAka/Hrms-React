import React, { useState, useEffect } from 'react'
import EmployerService from '../services/employerService'
import { Icon, Label, Menu, Table, Button, Header } from 'semantic-ui-react'
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
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Employer List</Header.Content>
            </Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Campany Name</Table.HeaderCell>
                        <Table.HeaderCell>Web Site</Table.HeaderCell>
                        <Table.HeaderCell>Phone Numbers</Table.HeaderCell>
                        <Table.HeaderCell>View Job Advertisements</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employers.map(employer => (

                            <Table.Row key={employer.id}>
                                <Table.Cell>{employer.companyName}</Table.Cell>
                                <Table.Cell>{employer.webSite}</Table.Cell>
                                <Table.Cell>{employer.phoneNumber}</Table.Cell>
                                <Table.Cell><Link to={`/employers/${employer.id}`}><Button>View Job Advertisements</Button></Link></Table.Cell>
                            </Table.Row>



                        ))
                    }

                </Table.Body>

                {/* <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron left' />
                                </Menu.Item>
                                <Menu.Item as='a'>1</Menu.Item>
                                <Menu.Item as='a'>2</Menu.Item>
                                <Menu.Item as='a'>3</Menu.Item>
                                <Menu.Item as='a'>4</Menu.Item>
                                <Menu.Item as='a' icon>
                                    <Icon name='chevron right' />
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer> */}
            </Table>
        </div>
    )
}
