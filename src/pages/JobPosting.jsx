import React, { useEffect, useState } from 'react'
import JobAdvertisementService from '../services/jobAdvertisementService'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom';
import { useFormik } from "formik";
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import WorkTimeService from '../services/workTimeService';
import WorkPlaceService from '../services/workPlaceService';
import CityService from '../services/cityService';
import JobPositionService from '../services/jobPositionService';

export default function JobPosting() {
    let jobAdvertisementService = new JobAdvertisementService()

    const JobAdvertAddSchema = Yup.object().shape({
        latestApplyTime: Yup.date().nullable().required("You have to fill this field"),
        description: Yup.string().required("You have to fill this field"),
        jobPosition: new Yup.ObjectSchema().required("You have to fill this field"),
        workTime: new Yup.ObjectSchema().required("You have to fill this field"),
        workPlace: new Yup.ObjectSchema().required("You have to fill this field"),
        openPositions: Yup.string().required("You have to fill this field").min(1, "It must be higher than 1"),
        city: new Yup.ObjectSchema().required("You have to fill this field"),
        minSalary: Yup.number().min(0, "It cannot be lower than 0"),
        maxSalary: Yup.number().min(0, "It cannot be lower than 0")
    });

    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            description: "",
            jobPosition: "",
            workTime: "",
            workPlace: "",
            openPositions: "",
            city: "",
            minSalary: "",
            maxSalary: "",
            latestApplyTime: "",
        },
        validationSchema: JobAdvertAddSchema,
        onSubmit: (values) => {
            values.employer = {id: 8};
            jobAdvertisementService.addJobAdvertisement(values).then((result) => console.log(result.data.data));
            alert("Job Advertisement is added. It is going be listed after validation.");
            history.push("/jobs");
        },
    });

    const [workTimes, setWorkTimes] = useState([]);
    const [workPlaces, setWorkPlaces] = useState([]);
    const [cities, setCities] = useState([]);
    const [jobPositions, setJobPositions] = useState([]);

    useEffect(() => {
        let workTimeService = new WorkTimeService()
        let workPlaceService = new WorkPlaceService()
        let cityService = new CityService()
        let jobPositionService = new JobPositionService()

        workTimeService.getAll().then(result => setWorkTimes(result.data.data))
        workPlaceService.getAll().then(result => setWorkPlaces(result.data.data))
        cityService.getAll().then(result => setCities(result.data.data))
        jobPositionService.getAll().then(result => setJobPositions(result.data.data))
    }, [])

    const workTimeOption = workTimes.map((workTime, index) => ({
        key: index,
        text: workTime.name,
        value: workTime,
    }));
    const workPlaceOption = workPlaces.map((workPlace, index) => ({
        key: index,
        text: workPlace.name,
        value: workPlace,
    }));
    const cityOption = cities.map((city, index) => ({
        key: index,
        text: city.cityName,
        value: city,
    }));
    const jobPositionOption = jobPositions.map((jobPosition, index) => ({
        key: index,
        text: jobPosition.position,
        value: jobPosition,
    }));

    const handleChangeSemantic = (value, fieldName) => {
        formik.setFieldValue(fieldName, value);
    }

    return (
        <div>
            <Card fluid color = 'black'>
                <Card.Content header='Post a job' />
                <Card.Content>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Field style={{ marginBottom: "1rem" }}>
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
                            <label>City</label>
                            <Dropdown
                                clearable
                                item
                                placeholder="City"
                                search
                                selection
                                onChange={(event, data) =>
                                    handleChangeSemantic(data.value, "city")
                                }
                                onBlur={formik.onBlur}
                                id="city"
                                value={formik.values.city}
                                options={cityOption}
                            />
                            {formik.errors.city && formik.touched.city && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.city}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <label>Work Place</label>
                            <Dropdown
                                clearable
                                item
                                placeholder="Work Place"
                                search
                                selection
                                onChange={(event, data) =>
                                    handleChangeSemantic(data.value, "workPlace")
                                }
                                onBlur={formik.onBlur}
                                id="workPlace"
                                value={formik.values.workPlace}
                                options={workPlaceOption}
                            />
                            {formik.errors.workPlace && formik.touched.workPlace && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.workPlace}
                                </div>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <label>Work Time</label>
                            <Dropdown
                                clearable
                                item
                                placeholder="Work Time"
                                search
                                selection
                                onChange={(event, data) =>
                                    handleChangeSemantic(data.value, "workTime")
                                }
                                onBlur={formik.onBlur}
                                id="workTime"
                                value={formik.values.workTime}
                                options={workTimeOption}
                            />
                            {formik.errors.workTime && formik.touched.workTime && (
                                <div className={"ui pointing red basic label"}>{formik.errors.workTime}</div>
                            )}
                        </Form.Field>
                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    <label style={{ fontWeight: "bold" }}>Minimum Salary</label>
                                    <Input
                                        style={{ width: "100%" }}
                                        type="number"
                                        placeholder="Minimum Salary"
                                        value={formik.values.minSalary}
                                        name="minSalary"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                    </Input>
                                    {formik.errors.minSalary && formik.touched.minSalary && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.minSalary}
                                        </div>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <label style={{ fontWeight: "bold" }}>Maximum Salary</label>
                                    <Input
                                        style={{ width: "100%" }}
                                        type="number"
                                        placeholder="Maximum Salary"
                                        value={formik.values.maxSalary}
                                        name="maxSalary"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                    </Input>
                                    {formik.errors.maxSalary && formik.touched.maxSalary && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.maxSalary}
                                        </div>
                                    )}
                                </Grid.Column>
                            </Grid>
                        </Form.Field>

                        <Form.Field>
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    <label style={{ fontWeight: "bold" }}>Open Positions</label>
                                    <Input
                                        style={{ width: "100%" }}
                                        id="openPositions"
                                        name="openPositions"
                                        error={Boolean(formik.errors.openPositions)}
                                        onChange={formik.handleChange}
                                        value={formik.values.openPositions}
                                        onBlur={formik.handleBlur}
                                        type="number"
                                        placeholder="Open Positions"
                                    />
                                    {formik.errors.openPositions && formik.touched.openPositions && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.openPositions}
                                        </div>
                                    )}
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <label style={{ fontWeight: "bold" }}>Deadline</label>
                                    <Input
                                        style={{ width: "100%" }}
                                        type="date"
                                        error={Boolean(formik.errors.latestApplyTime)}
                                        onChange={(event, data) =>
                                            handleChangeSemantic(data.value, "latestApplyTime")
                                        }
                                        value={formik.values.latestApplyTime}
                                        onBlur={formik.handleBlur}
                                        name="latestApplyTime"
                                        placeholder="Deadline"
                                    />
                                    {formik.errors.latestApplyTime && formik.touched.latestApplyTime && (
                                        <div className={"ui pointing red basic label"}>
                                            {formik.errors.latestApplyTime}
                                        </div>
                                    )}
                                </Grid.Column>
                            </Grid>
                        </Form.Field>

                        <Form.Field>
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
                            content="Add"
                            labelPosition="right"
                            icon="add"
                            positive
                            type="submit"
                            style={{ marginLeft: "20px" }}
                        />
                        {/* <pre>
                            {JSON.stringify(formik.values, null, 2)}
                        </pre> */}
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}
