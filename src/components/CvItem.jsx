import React, {useEffect, useState} from 'react'
import CvService from "../services/cvService";
import EducationService from "../services/educationService";
import JobExperienceService from "../services/jobExperienceService";
import TechOrProgrammingLangService from "../services/techOrProgrammingLangService";
import ForeignLanguageService from "../services/foreignLanguageService";
import {Button, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import CV from "react-cv";
import {toast} from "react-toastify";


const CvItem = ({edit, cvId}) => {

    const [cv, setCv] = useState([])
    useEffect(() => {
        let cvService = new CvService()
        cvService.getCvsById(cvId).then(result => setCv(result.data.data))
    }, [])

    const [educations, setEducations] = useState([])
    useEffect(() => {
        let educationService = new EducationService()
        educationService.getByCvId(cvId).then(result => setEducations(result.data.data))
    }, [])

    const [jobExperiences, setJobExperiences] = useState([])
    useEffect(() => {
        let jobExperienceService = new JobExperienceService()
        jobExperienceService.getJobExperienceServicesByCvId(cvId).then(result => setJobExperiences(result.data.data))
    }, [])

    const [techOrProgrammingLangs, setTechOrProgrammingLangs] = useState([])
    useEffect(() => {
        let techOrProgrammingLangService = new TechOrProgrammingLangService()
        techOrProgrammingLangService.getAllByCvId(cvId).then(result => setTechOrProgrammingLangs(result.data.data))
    }, [])

    const [foreignLanguages, setForeignLanguages] = useState([])
    useEffect(() => {
        let foreignLanguageService = new ForeignLanguageService()
        foreignLanguageService.getAllByCvId(cvId).then(result => setForeignLanguages(result.data.data))
    }, [])

    const deleteEducation = async (id) => {
        let service = new EducationService()
        const response = await service.deleteByID(id)
        service.getByCvId(cvId).then(result => setEducations(result.data.data))
        if (response.data.success) {
            toast.success(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else if (!response.data.success) {
            toast.error(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const edus = educations.map(edu => (
        {
            title: edu.schoolName,
            authority: 'University',
            authorityWebSite: 'https://sample.edu',
            rightSide:
                <label>
                    {edu.beginDate} - {edu.finishDate}
                    <Button onClick={() => {deleteEducation(edu.id)}} animated = 'fade' floated = 'right' size = 'small' color = 'red'>
                        <Button.Content visible>DELETE</Button.Content>
                        <Button.Content hidden><Icon name = 'trash'/></Button.Content>
                    </Button>
                </label>
        }
    ))
    const deleteJobExperience = async (id) => {
        let service = new JobExperienceService()
        const response = await service.deleteById(id)
        service.getJobExperienceServicesByCvId(cvId).then(result => setJobExperiences(result.data.data))
        if (response.data.success) {
            toast.success(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else if (!response.data.success) {
            toast.error(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }

    }
    const exps = jobExperiences.map(jobexp => (
        {
            title: `${jobexp.workplaceName}`,
            description: 'I\'m working as a lead developer yeeeey!',
            companyWebSite: 'http://somecompanyexample.com',
            companyMeta: '',
            datesBetween:
                <label>
                    {jobexp.beginDate} - {jobexp.finishDate}
                    <Button onClick={() => {deleteJobExperience(jobexp.id)}} animated = 'fade' floated = 'right' size = 'small' color = 'red'>
                        <Button.Content visible>DELETE</Button.Content>
                        <Button.Content hidden><Icon name = 'trash'/></Button.Content>
                    </Button>
                </label>,
            descriptionTags: [`${jobexp.jobPosition.position}`]
        }
    ))

    const deleteForeignLanguage = async (id) => {
        let foreignLanguageService = new ForeignLanguageService()
        const response = await foreignLanguageService.deleteForeignLanguageById(id)
        foreignLanguageService.getAllByCvId(cvId).then(result => setForeignLanguages(result.data.data))
        if (response.data.success) {
            toast.success(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else if (!response.data.success) {
            toast.error(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const langs = foreignLanguages.map(lang => (
        {
            authority:
                <label>
                    {lang.languageName}
                    <Button onClick={() => {deleteForeignLanguage(lang.id)}} animated = 'fade' floated = 'right' size = 'small' color = 'red'>
                        <Button.Content visible>DELETE</Button.Content>
                        <Button.Content hidden><Icon name = 'trash'/></Button.Content>
                    </Button>
                </label>,
            authorityMeta: `Level: ${lang.languageLevel}`
        }
    ))

    const educationTitle = <label>Educations <Link to = {`/educationadd/${cv.id}`}><Button animated = 'fade' color = 'blue' floated = 'right'>
        <Button.Content visible>Add New</Button.Content>
        <Button.Content hidden><Icon name = 'add'/></Button.Content>
    </Button></Link></label>

    const experienceTitle = <label>Experiences <Link to = {`/experienceadd/${cv.id}`}><Button floated = 'right' color = 'blue' animated = 'fade'>
        <Button.Content visible>Add New</Button.Content>
        <Button.Content hidden><Icon name = 'add'/></Button.Content>
    </Button></Link></label>

    const languageTitle = <label>Languages <Link to = {`/languageadd/${cv.id}`}><Button animated = 'fade' floated = 'right' color = 'blue'>
        <Button.Content visible>Add New</Button.Content>
        <Button.Content hidden><Icon name = 'add'/></Button.Content>
    </Button></Link></label>

    const skillTitle = <label>Technologies or Programming Languages <Link to = {`/techorprogramminglangadd/${cv.id}`}><Button color = 'blue' animated = 'fade' floated = 'right'>
        <Button.Content visible>Add New</Button.Content>
        <Button.Content hidden><Icon name = 'add'/></Button.Content>
    </Button></Link></label>

    const deleteTechnologyOrProgrammingLanguage = async (id) => {
        let service = new TechOrProgrammingLangService()
        const response = await service.deleteById(id)
        service.getAllByCvId(cvId).then(result => setTechOrProgrammingLangs(result.data.data))
        if (response.data.success) {
            toast.success(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } else if (!response.data.success) {
            toast.error(`${response.data.message}`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    const techsandprogs = techOrProgrammingLangs.map(techs => (
        <label>
            {techs.technologyOrProgrammingLanguage}
            <Button onClick={() => {deleteTechnologyOrProgrammingLanguage(techs.id)}} animated = 'fade' floated = 'right' size = 'mini' color = 'red'>
                <Button.Content visible>DELETE</Button.Content>
                <Button.Content hidden><Icon name = 'trash'/></Button.Content>
            </Button>
        </label>
    ))

    if (edit) {
        return <CV
            personalData={{
                name: `${cv.employee?.firstName} ${cv.employee?.lastName}`,
                image: cv.photo,
                contacts: [
                    { type: 'email', value: cv.employee?.email },
                    { type: 'linkedin', value: cv.linkedinLink },
                    { type: 'github', value: cv.githubLink }
                ]
            }}
            sections={[{
                type: 'text',
                title: 'Career Profile',
                content: cv.description,
                icon: 'usertie'
            },
                {
                    type: 'common-list',
                    title: educationTitle,
                    icon: 'graduation',
                    items: edus
                },
                {
                    type: 'experiences-list',
                    title: experienceTitle,
                    icon: 'archive',
                    items: exps
                },
                {
                    type: 'common-list',
                    title: languageTitle,
                    icon: 'language',
                    items: langs
                },
                {
                    type: 'tag-list',
                    title: skillTitle,
                    icon: 'rocket',
                    items: techsandprogs
                },
            ]}
            branding={false} // or false to hide it.
        />
    }
    return <CV
        personalData={{
            name: `${cv.employee?.firstName} ${cv.employee?.lastName}`,
            image: cv.photo,
            contacts: [
                { type: 'email', value: cv.employee?.email },
                { type: 'linkedin', value: cv.linkedinLink },
                { type: 'github', value: cv.githubLink }
            ]
        }}
        sections={[{
            type: 'text',
            title: 'Career Profile',
            content: cv.description,
            icon: 'usertie'
        },
            {
                type: 'common-list',
                title: 'Educations',
                icon: 'graduation',
                items: educations.map(edu => (
                    {
                        title: edu.schoolName,
                        authority: 'University',
                        authorityWebSite: 'https://sample.edu',
                        rightSide: `${edu.beginDate} - ${edu.finishDate === null ? 'Still Continue' : edu.finishDate}`
                    }
                ))
            },
            {
                type: 'experiences-list',
                title: 'Experiences',
                icon: 'archive',
                items: jobExperiences.map(jobexp => (
                    {
                        title: `${jobexp.workplaceName}`,
                        description: 'I\'m working as a lead developer yeeeey!',
                        companyWebSite: 'http://somecompanyexample.com',
                        companyMeta: '',
                        datesBetween: `${jobexp.beginDate} - ${jobexp.finishDate === null ? 'Still Continue' : jobexp.finishDate}`,
                        descriptionTags: [`${jobexp.jobPosition.position}`]
                    }
                ))
            },
            {
                type: 'common-list',
                title: 'Languages',
                icon: 'language',
                items: foreignLanguages.map((item) => ({
                    authority: item.languageName,
                    authorityMeta: `Level: ${item.languageLevel}`
                }))
            },
            {
                type: 'tag-list',
                title: 'Technologies or Programming Languages',
                icon: 'rocket',
                items: techOrProgrammingLangs.map((item) => `${item.technologyOrProgrammingLanguage}`)
            },
        ]}
        branding={false} // or false to hide it.
    />
}

export default CvItem;