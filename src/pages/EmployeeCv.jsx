import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import CvService from '../services/cvService'
import { Button, Header, Icon, Table, Card, Image } from "semantic-ui-react";
import EducationService from '../services/educationService';
import JobExperienceService from '../services/jobExperienceService';
import TechOrProgrammingLangService from '../services/techOrProgrammingLangService';
import ForeignLanguageService from '../services/foreignLanguageService';
import CV from 'react-cv'

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
    
    const techsandprogs = techOrProgrammingLangs.map(techs => (
        `${techs.technologyOrProgrammingLanguage}`
    ))

    return (
        <div>
            {/* <Card color='grey'>
                <Image src={cv.photo} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{cv.employee?.firstName}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined in 2015</span>
                    </Card.Meta>
                    <Card.Description>
                        {cv.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                </Card.Content>
            </Card>
            <Header as="h1">
                <Icon name="clipboard" />
                <Header.Content>Employee's Cv</Header.Content>
            </Header>
            <Table celled color='grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Github Link</Table.HeaderCell>
                        <Table.HeaderCell>Linkedin Link</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Created Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{cv.employee?.firstName}</Table.Cell>
                        <Table.Cell>{cv.employee?.lastName}</Table.Cell>
                        <Table.Cell>{cv.githubLink}</Table.Cell>
                        <Table.Cell>{cv.linkedinLink}</Table.Cell>
                        <Table.Cell>{cv.description}</Table.Cell>
                        <Table.Cell>{cv.createdDate}</Table.Cell>
                    </Table.Row>
                </Table.Body>

            </Table>
            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Educations</Header.Content>
            </Header>
            <Table celled color='grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>School Name</Table.HeaderCell>
                        <Table.HeaderCell>Field</Table.HeaderCell>
                        <Table.HeaderCell>Begin Date</Table.HeaderCell>
                        <Table.HeaderCell>Finish Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        educations.map(education => (
                            <Table.Row>
                                <Table.Cell>{education.schoolName}</Table.Cell>
                                <Table.Cell>{education.field}</Table.Cell>
                                <Table.Cell>{education.beginDate}</Table.Cell>
                                <Table.Cell>{education.finishDate === null ? "Countinue" : education.finishDate}</Table.Cell>
                            </Table.Row>
                        ))
                    }


                </Table.Body>
            </Table>

            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Job Experiences</Header.Content>
            </Header>
            <Table celled color='grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Company Name</Table.HeaderCell>
                        <Table.HeaderCell>Begin Date</Table.HeaderCell>
                        <Table.HeaderCell>Finish Date</Table.HeaderCell>
                        <Table.HeaderCell>Position</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        jobExperiences.map(jobExperience => (
                            <Table.Row>
                                <Table.Cell>{jobExperience.workplaceName}</Table.Cell>
                                <Table.Cell>{jobExperience.beginDate}</Table.Cell>
                                <Table.Cell>{jobExperience.finishDate === null ? "Countinue" : jobExperience.finishDate}</Table.Cell>
                                <Table.Cell>{jobExperience.jobPosition.position}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>

            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Technology and Programming Languages</Header.Content>
            </Header>
            <Table celled color='grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Technology Name</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        techOrProgrammingLangs.map(tech => (
                            <Table.Row>
                                <Table.Cell>{tech.technologyOrProgrammingLanguage}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>

            <Header as="h2">
                <Icon name="list alternate outline" />
                <Header.Content>Foreign Languages</Header.Content>
            </Header>
            <Table celled color='grey' inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Language</Table.HeaderCell>
                        <Table.HeaderCell>Language Level</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        foreignLanguages.map(language => (
                            <Table.Row>
                                <Table.Cell>{language.languageName}</Table.Cell>
                                <Table.Cell>{language.languageLevel}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table> */}

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
                    title: 'Education',
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
                    title: 'Languages',
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
