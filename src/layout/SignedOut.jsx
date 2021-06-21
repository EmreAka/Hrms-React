import React from 'react'
import { Button } from 'semantic-ui-react'

export default function SignedOut(props) {
    return (
        <div>
            <Button color = 'white' onClick = {props.signIn}    >Log in</Button>
            <Button color = 'white' style={{ marginLeft: '0.5em' }}>Register</Button>
        </div>
    )
}
