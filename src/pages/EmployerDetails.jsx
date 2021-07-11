import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import JobAdvertisement from '../services/jobAdvertisementService'
import { Icon, Table, Button, Header } from 'semantic-ui-react'
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
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Job List</Header.Content>
            </Header>
            <Table celled color = 'grey' inverted>
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
                                <Table.Cell>
                                    <Link to={`/jobs/${jobAdvertisement.id}`}>
                                        <Button animated color = 'black'>
                                            <Button.Content visible>View</Button.Content>
                                            <Button.Content hidden><Icon name='arrow right' />
                                            </Button.Content>
                                        </Button>
                                    </Link>
                                </Table.Cell>
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
