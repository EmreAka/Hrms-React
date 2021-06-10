import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Label, Menu, Table, Button, Header } from 'semantic-ui-react'
import JobAdvertisementService from '../services/jobAdvertisementService'

export default function JobAdvertisement() {

    const [jobAdvertisements, setJobAdvertisement] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisements().then(result => setJobAdvertisement(result.data.data))
    }, [])

    return (
        <div>
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Job List</Header.Content>
            </Header>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Campany Name</Table.HeaderCell>
                        <Table.HeaderCell>Job Position</Table.HeaderCell>
                        <Table.HeaderCell>Job Description</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>View</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobAdvertisements.map(jobAdvertisement => (

                            <Table.Row key={jobAdvertisement.id}>
                                <Table.Cell>{jobAdvertisement.employer.companyName}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.jobPosition.position}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.description}</Table.Cell>
                                <Table.Cell>{jobAdvertisement.city.cityName}</Table.Cell>
                                <Table.Cell><Link to={`/jobs/${jobAdvertisement.id}`}><Button>View</Button></Link></Table.Cell>
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
