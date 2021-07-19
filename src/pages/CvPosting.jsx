import React from 'react'
import CvService from "../services/cvService";
import * as Yup from 'yup'
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Button, Card, Form, Input, TextArea} from "semantic-ui-react";

export default function CvPosting() {
    let cvService = new CvService()

    const cvSchema = Yup.object().shape({

    })

    const formik = useFormik({
        initialValues: {
            githubLink: "",
            linkedinLink: "",
            description: "",
            employee: "",
        },
        validationSchema: cvSchema,
        onSubmit: async (values) => {
            values.employee = {id: 1}
            const response = await cvService.addCv(values)
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
                <Card.Content header = 'Add CV'/>
                <Card.Content>
                    <Form onSubmit = {formik.handleSubmit}>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                            <label>Github</label>
                            <Input
                                placeholder="Github Link"
                                style={{ minHeight: 50 }}
                                error={Boolean(formik.errors.githubLink).toString()}
                                value={formik.values.githubLink}
                                name="githubLink"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.githubLink && formik.touched.githubLink && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.githubLink}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                            <label>Linkedin</label>
                            <Input
                                placeholder="Linkedin Link"
                                style={{ minHeight: 50 }}
                                error={Boolean(formik.errors.linkedinLink).toString()}
                                value={formik.values.linkedinLink}
                                name="linkedinLink"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.linkedinLink && formik.touched.linkedinLink && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.linkedinLink}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field style={{ marginBottom: "1rem" }}>
                            <label>Description</label>
                            <TextArea
                                placeholder="Description"
                                style={{ minHeight: 100 }}
                                error={Boolean(formik.errors.description).toString()}
                                value={formik.values.description}
                                name="description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.description && formik.touched.description && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.description}
                                </div>
                            )}
                        </Form.Field>
                        <Button
                            content='Add'
                            labelPosition='right'
                            icon='add'
                            positive
                            type='submit'
                            style={{ marginLeft: '20px' }}
                        />
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}
