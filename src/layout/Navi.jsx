import React, { useState } from 'react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import SignedOut from './SignedOut'
import SignedIn from './SignedIn'
export default function Navi() {

    const [isAuthenticanted, setisAuthenticanted] = useState(true)
    function handleSignedOut(params) {
        setisAuthenticanted(false)
    }

    function handleSignedIn(params) {
        setisAuthenticanted(true)
    }


    return (
        <div>
            <Menu fixed="top">
                <Menu.Item
                    name='home'
                />
                <Menu.Item
                    name='messages'
                />

                <Menu.Menu position='right'>

                    <Menu.Item>
                        {isAuthenticanted?<SignedIn signOut = {handleSignedOut} bisey = "1"/>:<SignedOut signIn = {handleSignedIn} bisey = "2"/>}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    )
}
