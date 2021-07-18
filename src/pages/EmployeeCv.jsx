import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvService from '../services/cvService'
import EducationService from '../services/educationService';
import JobExperienceService from '../services/jobExperienceService';
import TechOrProgrammingLangService from '../services/techOrProgrammingLangService';
import ForeignLanguageService from '../services/foreignLanguageService';
import CV from 'react-cv'
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";

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

    const langs = foreignLanguages.map(lang => (
        {
            authority: `${lang.languageName}`,
            authorityMeta: `Level: ${lang.languageLevel}`
        }
    ))
    const languageTitle = <Link to = {"/home"}>Languages</Link>
    const educationTitle = <Link to = {"/home"}>Educations</Link>

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
                    title: 'Experiences',
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
                    title: 'Skills Proficiency',
                    icon: 'rocket',
                    items: techsandprogs
                  },
                ]}
                branding={false} // or false to hide it.
            />
        </div>
    )
}
