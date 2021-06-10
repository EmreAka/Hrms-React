import React from 'react'
import { Button } from 'semantic-ui-react'

export default function SignedOut(props) {
    return (
        <div>
            <Button onClick = {props.signIn} primary>Log in</Button>
            <Button primary style={{ marginLeft: '0.5em' }}>Register</Button>
        </div>
    )
}
