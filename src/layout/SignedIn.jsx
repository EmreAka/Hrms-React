import React from 'react'
import { Dropdown, Menu, Image } from 'semantic-ui-react'

export default function SignedIn(props) {
    return (
        <div>
            <Menu.Item>
                <Image avatar spaced="right" src="https://pbs.twimg.com/profile_images/1363851759849009155/ASBcvOdj_400x400.jpg" />
                <Dropdown pointing="top left" text="Emre">
                    <Dropdown.Menu>
                        <Dropdown.Item text="Informations" icon="info" />
                        <Dropdown.Item onClick={props.signOut} text="Log out" icon="sign-out" />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div >
    )
}
