import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvService from '../services/cvService'
import EducationService from '../services/educationService';
import JobExperienceService from '../services/jobExperienceService';
import TechOrProgrammingLangService from '../services/techOrProgrammingLangService';
import ForeignLanguageService from '../services/foreignLanguageService';
import CV from 'react-cv'
import {Link} from "react-router-dom";
import {Button, Icon, Image} from "semantic-ui-react";

export default function EmployeeCv() {

    let { id, cvId } = useParams()

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

    const edus = educations.map(edu => (
        {
            title: edu.schoolName,
            authority: 'University',
            authorityWebSite: 'https://sample.edu',
            rightSide: `${edu.beginDate} - ${edu.finishDate}`
        }
    ))
    
    const exps = jobExperiences.map(jobexp => (
        {
            title: `${jobexp.workplaceName}`,
            description: 'I\'m working as a lead developer yeeeey!',
            companyWebSite: 'http://somecompanyexample.com',
            companyMeta: '',
            datesBetween: `${jobexp.beginDate} - ${jobexp.finishDate}`,
            descriptionTags: [`${jobexp.jobPosition.position}`]
          }
    ))

    const deleteForeignLanguage = async (id) => {
        let foreignLanguageService = new ForeignLanguageService()
        const respond = await foreignLanguageService.deleteForeignLanguageById(id)
        if (respond.data.success) {
            console.log("Başarılı")
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
                <Button onClick={() => {console.log("EDIT")}} animated = 'fade' color = 'yellow' size = 'small' floated = 'right' >
                    <Button.Content visible>EDIT</Button.Content>
                    <Button.Content hidden><Icon name = 'pencil'/></Button.Content>
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


    const techsandprogs = techOrProgrammingLangs.map(techs => (
        `${techs.technologyOrProgrammingLanguage}`
    ))

    return (
        <div>
            <CV
                personalData={{
                    name: cv.employee?.firstName,
                    title: cv.description,
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
                    content: 'When I was child, I always want to be a developer.',
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
        </div>
    )
}
