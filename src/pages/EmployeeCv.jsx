import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvItem from "../components/CvItem";
import {Button} from "semantic-ui-react";

export default function EmployeeCv() {

    let { id, cvId } = useParams()

    const [edit, setEdit] = useState(false)

    return (
        <div>
            <Button onClick={() => setEdit(true)} color = 'vk' fluid >Edit Your CV</Button>
            <CvItem edit={edit} cvId={cvId} />
        </div>
    )
}
