import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import JobAdvertisement from '../services/jobAdvertisementService'
import { Icon, Label, Menu, Table, Button, Header } from 'semantic-ui-react'

export default function JobAdvertisementDetail() {
    let { id } = useParams()

    const [jobAdvertisement, setJobAdvertisement] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisement()
        jobAdvertisementService.findByIdAndActiveTrueOrderByCreatedTimeDesc(id).then(result => setJobAdvertisement(result.data.data))
    }, [])
    return (
        <div>
            <Header as="h2">
                <Icon name="clipboard" />
                <Header.Content>Job Details</Header.Content>
            </Header>
            <Table celled color = 'grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Min Salary</Table.HeaderCell>
                        <Table.HeaderCell>Max Salary</Table.HeaderCell>
                        <Table.HeaderCell>Available Positions</Table.HeaderCell>
                        <Table.HeaderCell>Deadline</Table.HeaderCell>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{jobAdvertisement.description}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.minSalary} TL</Table.Cell>
                        <Table.Cell>{jobAdvertisement.maxSalary} TL</Table.Cell>
                        <Table.Cell>{jobAdvertisement.openPositions} Position is available</Table.Cell>
                        <Table.Cell>{jobAdvertisement.latestApplyTime}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.jobPosition?.position}</Table.Cell>
                        <Table.Cell>{jobAdvertisement.city?.cityName}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}
