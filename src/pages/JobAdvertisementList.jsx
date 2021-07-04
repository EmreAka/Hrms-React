import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Label, Menu, Table, Button, Header, Image, Item } from 'semantic-ui-react'
import JobAdvertisementService from '../services/jobAdvertisementService'
import { useDispatch } from 'react-redux'
import { addToFavorite } from '../store/actions/favoriteActions'

export default function JobAdvertisement() {

    const [jobAdvertisements, setJobAdvertisement] = useState([])
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getJobAdvertisements().then(result => setJobAdvertisement(result.data.data))
    }, [])


    const dispatch = useDispatch()
    const handleAddToFavorite = (jobAdvertisements) => {
        dispatch(addToFavorite(jobAdvertisements))
    }


    return (
        <div>
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Job List</Header.Content>
            </Header>
            <Item.Group divided>
                {
                    jobAdvertisements.map(jobAdvertisement => (
                        <Item key={jobAdvertisement.id}>
                            <Item.Image size='small' src='https://res.cloudinary.com/emreaka/image/upload/v1624304366/job_o67inx.jpg' />
                            <Item.Content>
                                <Item.Header>{jobAdvertisement.employer.companyName}</Item.Header>
                                <Item.Meta>
                                    <span className='price'>{jobAdvertisement.maxSalary} TL</span>
                                    <span className='stay'>{jobAdvertisement.city.cityName}</span>
                                </Item.Meta>
                                <Item.Description>{jobAdvertisement.description}</Item.Description>
                                <Link to={`/jobs/${jobAdvertisement.id}`}>
                                    <Button animated color='black'>
                                        <Button.Content visible>Job's Details</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </Link>
                                <Button animated color='black' onClick = {() => handleAddToFavorite(jobAdvertisement)}>
                                    <Button.Content visible>Add to Favorites</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>
        </div>
    )
}
