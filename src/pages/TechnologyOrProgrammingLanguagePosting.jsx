import React from 'react'
import * as Yup from 'yup'
import { useParams } from 'react-router'
import TechOrProgrammingLangService from "../services/techOrProgrammingLangService";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Button, Card, Form, Input} from "semantic-ui-react";

export default function TechnologyOrProgrammingLanguagePosting() {
    let { cvId } = useParams()
    let technologyOrProgrammingLanguageService = new TechOrProgrammingLangService()

    const TechnologySchema = Yup.object().shape({
        technologyOrProgrammingLanguage: Yup.string().required("You have to fill this area")
    })

    const formik = useFormik({
        initialValues: {
            technologyOrProgrammingLanguage: ""
        },
        validationSchema: TechnologySchema,
        onSubmit: async (values) => {
            values.cv = {id: cvId}
            const response = await technologyOrProgrammingLanguageService.addTechOrProgrammingLangService(values)
            if (response.data.success) {
                toast.success(`${response.data.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            } else if (!response.data.success) {
                toast.error(`${response.data.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }
    })



    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Add Technology to the CV'/>
                <Card.Content>
                    <Form onSubmit = {formik.handleSubmit}>
                        <Form.Field style = {{ marginBottom: '1rem'}}>
                            <label>Technology Or Programming Language</label>
                            <Input
                                placeholder = 'Technology or Programming Language'
                                error = {Boolean(formik.errors.technologyOrProgrammingLanguage).toString()}
                                value = {formik.values.technologyOrProgrammingLanguage}
                                name = 'technologyOrProgrammingLanguage'
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                            />
                            {formik.errors.technologyOrProgrammingLanguage && formik.touched.technologyOrProgrammingLanguage && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.technologyOrProgrammingLanguage}
                                </div>
                            )}
                        </Form.Field>
                        <Button
                            content = 'Add'
                            labelPosition = 'right'
                            icon = 'add'
                            positive
                            type = 'submit'
                            stlye = {{ marginLeft: '20px'}}
                        />
                    </Form>
                    <pre>
                            {JSON.stringify(formik.values, null, 2)}
                        </pre>
                </Card.Content>
            </Card>
        </div>
    )
}
