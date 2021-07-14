import React, { useState, useEffect } from 'react'
import {Icon, Header, Pagination} from 'semantic-ui-react'
import JobAdvertisementService from '../services/jobAdvertisementService'

import JobAdvertisementsItem from "../components/JobAdvertisementsItem";

export default function JobAdvertisement() {

    const [JobAdvertisements, setJobAdvertisement] = useState([])
    const [Loading, setLoading] = useState(false)
    const [CurrentPage, setCurrentPage] = useState(1)
    const [JobAdvertisementsPerPage, setJobAdvertisementsPerPage] = useState(2)

    useEffect(() => {
        const fetchJobAdvertisements = async () => {
            setLoading(true)
            let jobAdvertisementService = new JobAdvertisementService()
            const response = await jobAdvertisementService.getJobAdvertisements()
            setJobAdvertisement(response.data.data)
            setLoading(false)
        }
        fetchJobAdvertisements()
    }, [])

    // Get Current Posts
    const indexOfLastJobAdvertisement = CurrentPage * JobAdvertisementsPerPage;
    const indexOfFirstJobAdvertisement = indexOfLastJobAdvertisement - JobAdvertisementsPerPage
    const currentJobAdvertisements = JobAdvertisements.slice(indexOfFirstJobAdvertisement, indexOfLastJobAdvertisement)

    //Pagination Logic
    const totalPosts = JobAdvertisements.length
    const totalPages = totalPosts / JobAdvertisementsPerPage

    return (
        <div>
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Job List</Header.Content>
            </Header>
            <JobAdvertisementsItem jobAdvertisements={currentJobAdvertisements} loading={Loading} />

            <Pagination defaultActivePage={1} totalPages={totalPages} onPageChange={(event, data) => {setCurrentPage(data.activePage)}} />
        </div>
    )
}
