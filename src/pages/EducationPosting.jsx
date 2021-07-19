import React from 'react'
import EducationService from "../services/educationService";
import * as Yup from 'yup'
import {useFormik} from "formik";
import { useParams } from 'react-router'
import {toast} from "react-toastify";
import {Button, Card, Form, Grid, Input} from "semantic-ui-react";

export default function EducationPosting() {
    let { cvId } = useParams()

    let educationService = new EducationService()
    const EducationSchema = Yup.object().shape({
        schoolName: Yup.string().required("You have to fill this area"),
        field: Yup.string().required("You have to fill this area"),
        beginDate: Yup.date().nullable().required("You have too fill this area"),
        finishDate: Yup.date().nullable()
    })
    const formik = useFormik({
        initialValues: {
            schoolName: "",
            field: "",
            beginDate: "",
            finishDate: ""
        },
        validationSchema: EducationSchema,
        onSubmit: async (values) => {
            values.cv = {id: cvId}
            const response = await educationService.addEducation(values)
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

    const handleChangeSemantic = (value, fieldName) => {
        formik.setFieldValue(fieldName, value)
    }

    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Add Education to the CV'>
                    <Form onSubmit = {formik.handleSubmit}>
                        <Form.Field stlye = {{ marginBottom: "1rem" }}>
                            <label>School Name</label>
                            <Input
                                placeholder = 'School Name'
                                style = {{ minHeight: 50}}
                                error = {Boolean(formik.errors.schoolName).toString()}
                                value = {formik.values.schoolName}
                                name = 'schoolName'
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                            />
                            {formik.errors.schoolName && formik.touched.schoolName && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.schoolName}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field stlye = {{ marginBottom: "1rem" }}>
                            <label>Field</label>
                            <Input
                                placeholder = 'Field'
                                style = {{ minHeight: 50}}
                                error = {Boolean(formik.errors.field).toString()}
                                value = {formik.values.field}
                                name = 'field'
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                            />
                            {formik.errors.field && formik.touched.field && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.field}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    <label style={{fontWeight: 'bold'}}>Begin Date</label>
                                    <Input
                                        placeholder = 'Begin Date'
                                        style = {{ width: "100%"}}
                                        type = 'date'
                                        error = {Boolean(formik.errors.beginDate).toString()}
                                        value = {formik.values.beginDate}
                                        name = 'beginDate'
                                        onChange = {(event, data) => (
                                            handleChangeSemantic(data.value, "beginDate")
                                        )}
                                        onBlur = {formik.handleBlur}
                                    />
                                    {formik.errors.beginDate && formik.touched.beginDate && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.beginDate}
                                        </div>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <label style={{fontWeight: 'bold'}}>Finish Date</label>
                                    <Input
                                        placeholder = 'Finish Date'
                                        style = {{ width: "100%"}}
                                        type = 'date'
                                        error = {Boolean(formik.errors.finishDate).toString()}
                                        value = {formik.values.finishDate}
                                        name = 'finishDate'
                                        onChange = {(event, data) => (
                                            handleChangeSemantic(data.value, "finishDate")
                                        )}
                                        onBlur = {formik.handleBlur}
                                    />
                                    {formik.errors.finishDate && formik.touched.finishDate && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.finishDate}
                                        </div>
                                    )}
                                </Grid.Column>
                            </Grid>
                        </Form.Field>
                        {/*<pre>
                            {JSON.stringify(formik.values, null, 2)}
                        </pre>*/}
                        <Button
                            content = 'Add'
                            labelPosition = 'right'
                            icon = 'add'
                            positive
                            type = 'submit'
                            stlye = {{ marginLeft: '20px'}}
                        />
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}
