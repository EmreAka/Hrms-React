import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import JobExperienceService from "../services/jobExperienceService";
import * as Yup from 'yup'
import {useFormik} from "formik";
import {toast} from "react-toastify";
import JobPositionService from "../services/jobPositionService";
import {Button, Card, Dropdown, Form, Grid, Input} from "semantic-ui-react";
export default function ExperiencePosting() {
    let { cvId } = useParams()
    let experienceService = new JobExperienceService()

    const ExperienceSchema = Yup.object().shape({
        workplaceName: Yup.string().required("You have to fill this area"),
        beginDate: Yup.date().nullable().required("You have to fill this area"),
        finishDate: Yup.date().nullable(),
        jobPosition: new Yup.ObjectSchema().required("You have to fill this area")
    })

    const formik = useFormik({
        initialValues: {
            workplaceName: "",
            beginDate: "",
            finishDate: "",
            jobPosition: ""
        },
        validationSchema: ExperienceSchema,
        onSubmit: async (values) => {
            values.cv = {id: cvId}
            const response = await experienceService.addJobExperience(values)
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

    const [jobPositions, setJobPositions] = useState([])
    useEffect(() => {
        let jobPositionService = new JobPositionService()
        jobPositionService.getAll().then(result => setJobPositions(result.data.data))
    }, [])

    const jobPositionOption = jobPositions.map((jobPosition, index) => ({
        key: index,
        text: jobPosition.position,
        value: jobPosition
    }))

    const handleChangeSemantic = (value, fieldName) => {
        formik.setFieldValue(fieldName, value)
    }

    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Add Experience to the CV'/>
                <Card.Content>
                    <Form onSubmit = {formik.handleSubmit}>
                        <Form.Field style = {{ marginBottom: '1rem'}}>
                            <label>Workplace</label>
                            <Input
                                placeholder = 'Workplace Name'
                                error = {Boolean(formik.errors.workplaceName).toString()}
                                value = {formik.values.workplaceName}
                                name = 'workplaceName'
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                            />
                            {formik.errors.workplaceName && formik.touched.workplaceName && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.workplaceName}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <label>Job Position</label>
                            <Dropdown
                                clearable
                                item
                                placeholder="Job Position"
                                search
                                selection
                                onChange={(event, data) =>
                                    handleChangeSemantic(data.value, "jobPosition")
                                }
                                onBlur={formik.onBlur}
                                id="jobPosition"
                                value={formik.values.jobPosition}
                                options={jobPositionOption}
                            />
                            {formik.errors.jobPosition && formik.touched.jobPosition && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.jobPosition}
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
