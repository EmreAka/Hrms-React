import React, {useEffect, useState} from 'react'
import {Button, Header, Icon, Item} from "semantic-ui-react";
import {Link} from "react-router-dom";
import FavoriteService from "../services/favorite";
import {toast} from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteJobs } from '../store/actions/favoriteActions';

export default function FavoriteJobAdvertisement() {

    const dispatch = useDispatch()
    const favjobs = useSelector(state => state.favorite.favoriteJobs)
    useEffect(() => {
        dispatch(fetchFavoriteJobs())
    }, [])

    const [FavoriteJobs, setFavoriteJobs] = useState([])
    useEffect(() => {
        let favoriteService = new FavoriteService()
        favoriteService.getByEmployeeId(1).then(result => setFavoriteJobs(result.data.data))
    },[])

    const deleteFavorite = (id) => {
        let favoriteService = new FavoriteService()
        favoriteService.deleteFavoriteByFavoriteId(id)
        toast.success('job removed to the favorite jobs', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        console.log(id)
    }

    return (
        <div>
            <Header as="h2">
                <Icon name="list alternate outline"/>
                <Header.Content>Favorite Jobs</Header.Content>
            </Header>
            <Item.Group divided>
                {
                    favjobs.map(favoritejob => (
                        <Item key={favoritejob.id}>
                            <Item.Image size='small'
                                        src='https://res.cloudinary.com/emreaka/image/upload/v1624304366/job_o67inx.jpg'/>
                            <Item.Content>
                                <Item.Header>{favoritejob.job.employer.companyName}</Item.Header>
                                <Item.Meta>
                                    <span className='price'>{favoritejob.job.maxSalary} TL</span>
                                    <span className='stay'>{favoritejob.job.city.cityName}</span>
                                </Item.Meta>
                                <Item.Description>{favoritejob.job.description}</Item.Description>
                                <Link to={`/jobs/${favoritejob.job.id}`}>
                                    <Button animated color='black'>
                                        <Button.Content visible>Job's Details</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right'/>
                                        </Button.Content>
                                    </Button>

                                </Link>
                                <Button animated = 'fade' color = 'red' onClick={() => deleteFavorite(favoritejob.id)}>
                                    <Button.Content visible>Remove From Favorites</Button.Content>
                                    <Button.Content hidden><Icon name = 'trash'/></Button.Content>
                                </Button>
                            </Item.Content>
                        </Item>
                    ))
                }
            </Item.Group>

            {/* {JSON.stringify(favjobs)} */}

            {/* {favjobs.map(item => {return <h3>{item.id}</h3>})} */}
        </div>
    )
}
