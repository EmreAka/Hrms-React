import React from 'react'
import {Button, Dimmer, Icon, Image, Item, Loader, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToFavorite} from "../store/actions/favoriteActions";

const JobAdvertisementsItem = ({jobAdvertisements, loading}) => {

    const dispatch = useDispatch()
    const handleAddToFavoriteDb = (jobAdvertisements) => {
        const favorite = {job: {id: jobAdvertisements.id}, employee: {id: 1}}
        dispatch(addToFavorite(favorite))
    }

    if (loading){
        return <Segment>
                <Dimmer active>
                    <Loader size='big' />
                </Dimmer>
                <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            </Segment>

    }
        return <Item.Group divided>
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
                                    <Button animated color='grey'>
                                        <Button.Content visible>Job's Details</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </Link>
                                <Button animated='fade' color='yellow' onClick = {() => handleAddToFavoriteDb(jobAdvertisement)}>
                                    <Button.Content visible>Add to Favorites</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='star' />
                                    </Button.Content>
                                </Button>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>
}
export default JobAdvertisementsItem