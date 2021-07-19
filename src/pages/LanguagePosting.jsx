import React from 'react'
import ForeignLanguageService from "../services/foreignLanguageService";
import * as Yup from 'yup'
import { useParams } from 'react-router'
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Button, Card, Form, Input} from "semantic-ui-react";
import {useHistory} from "react-router-dom";

export default function LanguagePosting() {
    let { cvId } = useParams()
    let languageService = new ForeignLanguageService()

    const history = useHistory()

    const LanguageSchema = Yup.object().shape({
        languageName: Yup.string().required("You have to fill this area"),
        languageLevel: Yup.number().min(0, "It cannot be lower than 0").max(5, "It cannot be higher than 5").required("You have to fill this area")
    })

    const formik = useFormik({
        initialValues: {
            languageName: "",
            languageLevel: ""
        },
        validationSchema: LanguageSchema,
        onSubmit: async (values) => {
            values.cv = {id: cvId}
            const response = await languageService.addForeignLanguage(values)
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
            setTimeout(() => { history.push(`/employees/1/${cvId}`); }, 2000)
        }
    })

    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header = 'Add Language to the CV'/>
                <Card.Content>
                    <Form onSubmit = {formik.handleSubmit}>
                        <Form.Field style = {{ marginBottom: '1rem'}}>
                            <label>Language</label>
                            <Input
                                placeholder = 'Language Name'
                                error = {Boolean(formik.errors.languageName).toString()}
                                value = {formik.values.languageName}
                                name = 'languageName'
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                            />
                            {formik.errors.languageName && formik.touched.languageName && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.languageName}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <label>Language Level</label>
                            <Input
                                placeholder = 'Language Level'
                                error = {Boolean(formik.errors.languageLevel).toString()}
                                value = {formik.values.languageLevel}
                                name = 'languageLevel'
                                onChange = {formik.handleChange}
                                onBlur = {formik.handleBlur}
                            />
                            {formik.errors.languageLevel && formik.touched.languageLevel && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.languageLevel}
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
                </Card.Content>
            </Card>
        </div>
    )
}
