import React from 'react'
import {Button, Icon} from 'semantic-ui-react'

export default function SignedOut(props) {
    return (
        <div>
            <Button color = 'white' onClick = {props.signIn} animated='fade'>
                <Button.Content visible>Log in</Button.Content>
                <Button.Content hidden><Icon name='sign-in'></Icon></Button.Content>
            </Button>
            <Button color = 'white' style={{ marginLeft: '0.5em' }} animated='fade'>
                <Button.Content visible>Register</Button.Content>
                <Button.Content hidden><Icon name='save'></Icon></Button.Content>
            </Button>
        </div>
    )
}
