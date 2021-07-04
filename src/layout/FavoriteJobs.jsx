import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Dropdown, Label } from 'semantic-ui-react'

export default function FavoriteJobs() {

    const { favoriteJobs } = useSelector(state => state.favorite)

    return (
        <div>
            <Dropdown item text='Your Favorite Jobs'>
                <Dropdown.Menu>
                    {
                        favoriteJobs.map((favoriteJobs) => (
                            <Dropdown.Item key = {favoriteJobs.job.id}>
                                {favoriteJobs.job.employer.companyName} <Label>{favoriteJobs.job.jobPosition.position}</Label>
                            </Dropdown.Item>
                        ))
                    }

                    <Dropdown.Divider />
                    <Dropdown.Item as={NavLink} to="/cart">Show your cart</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
