import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dropdown, Label } from 'semantic-ui-react'
import FavoriteService from "../services/favorite";

export default function FavoriteJobs() {

    const { favoriteJobs } = useSelector(state => state.favorite)

    const [FavoriteJobs, setFavoriteJobs] = useState([])
    useEffect(() => {
        let favoriteService = new FavoriteService()
        favoriteService.getByEmployeeId(1).then(result => setFavoriteJobs(result.data.data))
    },[])

    return (
        <div>
            <Dropdown item text='Your Favorite Jobs'>
                <Dropdown.Menu>
                    {
                        FavoriteJobs.map((favoriteJobs) => (
                            <Dropdown.Item key = {favoriteJobs.job.id}>
                                {favoriteJobs.job.employer.companyName} <Label>{favoriteJobs.job.jobPosition.position}</Label>
                            </Dropdown.Item>
                        ))
                    }

                    <Dropdown.Divider />
                    <Dropdown.Item as={NavLink} to="/favorites">Show your cart</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
