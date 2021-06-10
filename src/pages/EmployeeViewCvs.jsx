import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvService from '../services/cvService'
import { Button, Header, Icon, Table } from "semantic-ui-react";
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
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Employee's Cvs</Header.Content>
            </Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Created Date</Table.HeaderCell>
                        <Table.HeaderCell>View</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        employeeCvs.map(cv => (

                            <Table.Row key={cv.id}>
                                <Table.Cell>{cv.employee.firstName}</Table.Cell>
                                <Table.Cell>{cv.employee.lastName}</Table.Cell>
                                <Table.Cell>{cv.description}</Table.Cell>
                                <Table.Cell>{cv.createdDate}</Table.Cell>
                                <Table.Cell><Link to={`/employees/${id}/${cv.id}`}><Button>View</Button></Link></Table.Cell>
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
