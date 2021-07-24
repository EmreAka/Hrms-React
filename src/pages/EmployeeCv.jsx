import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvItem from "../components/CvItem";
import {Button} from "semantic-ui-react";
import {toast} from "react-toastify";

export default function EmployeeCv() {

    let { id, cvId } = useParams()

    const [edit, setEdit] = useState(false)

    function handleEdit() {
        if (edit) {
            setEdit(false)
            toast.info('Edit mode disabled', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else if (!edit) {
            setEdit(true)
            toast.info('Edit mode enabled', {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    
    return (
        <div>
            <Button onClick={() => handleEdit()} color = 'vk' fluid >Edit Your CV</Button>
            <CvItem edit={edit} cvId={cvId} />
        </div>
    )
}
