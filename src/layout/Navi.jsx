import React, { useState } from 'react'
import { Button, Dropdown, Menu, Icon } from 'semantic-ui-react'
import SignedOut from './SignedOut'
import SignedIn from './SignedIn'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import FavoriteJobs from './FavoriteJobs';
export default function Navi() {

    const { favoriteJobs } = useSelector(state => state.favorite)

    const [isAuthenticanted, setisAuthenticanted] = useState(true)
    function handleSignedOut(params) {
        setisAuthenticanted(false)
    }

    function handleSignedIn(params) {
        setisAuthenticanted(true)
    }


    return (
        <div>
            <Menu fixed="top" size='tiny' inverted>
                <Link to={`/home`}>
                    <Button animated color='black'>
                        <Button.Content visible>Home</Button.Content>
                        <Button.Content hidden>
                            <Icon name='home' />
                        </Button.Content>
                    </Button>
                </Link>

                <Menu.Menu position='right'>

                    <Menu.Item>
                        <FavoriteJobs/>
                        {isAuthenticanted ? <SignedIn signOut={handleSignedOut} bisey="1" /> : <SignedOut signIn={handleSignedIn} bisey="2" />}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    )
}
