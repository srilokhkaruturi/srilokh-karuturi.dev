import type { NextPage } from 'next'
import experiencesData from '../data/experiences.json'
import { useState } from 'react'

import styles from '../styles/Experiences.module.scss'

// components
import { Tabs, Typography, Select, Descriptions, Tag, Space, Menu, Row, Card, Divider, Timeline, Badge, Button } from 'antd'
import MenuDivider from 'antd/lib/menu/MenuDivider';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import Ribbon from 'antd/lib/badge/Ribbon'


const { CheckableTag } = Tag;
const { TabPane } = Tabs
const { Title, Text } = Typography

type experience = {
    companyShortName: string;
    company: string,
    companyURL: string,
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    teamDescription: string,
    highLevelDescription: string,
    description: string[],
    skills: string[]
}

const Experiences: NextPage = () => {
    // DATA
    const experiences: experience[] = experiencesData.experiences;

    // DEFINE OPTIONS FOR SELECTION
    const getOptions = (dataExperiences: experience[]) => {
        var returnList: any[] = []
        dataExperiences.forEach((dataExperience: experience, key) => {
            returnList.push({ key: key, label: dataExperience.company, value: key })
        })

        return returnList
    }

    const selectionOptions: any[] = getOptions(experiences)

    const [activeTab, setActiveTab] = useState(0)
    const [selection, setSelection] = useState(selectionOptions[0].value)

    const handleChange = (activeTab: number) => {
        setActiveTab(activeTab)
    }


    return (
        <>

            {/* DEFAULT SCREEN */}

            <div className="experiencesNormal">
                {experiences && experiences.length > 0 && (


                    <Tabs className={styles.experiencesMenuTabs} defaultActiveKey="0" tabPosition='left' onChange={() => handleChange}>

                        {experiences.map((experience, index) => (

                            <TabPane tab={<Title level={3}>{experience.companyShortName === "N/A" ? experience.company : experience.companyShortName}</Title>} key={index}>
                                <div className="experience">
                                    <Badge.Ribbon text={experience.endDate === "Present" ? "Present" : "Ended"} color={"gray"}>
                                        <Card className={styles.experienceTile}>


                                            <Descriptions labelStyle={{ "fontWeight": "bold" }} className={"experience-description"} title={getExperienceTitle(experience.companyURL, experience.company, experience.title)}>

                                                <Descriptions.Item label="Team">{experience.teamDescription}</Descriptions.Item>

                                                <Descriptions.Item label="Description">
                                                    <Space direction="horizontal">
                                                        {experience.highLevelDescription}

                                                    </Space>
                                                </Descriptions.Item>

                                                <Descriptions.Item label="Duration">
                                                    <Timeline pendingDot>
                                                        <Timeline.Item color={"gray"} ><CheckableTag className={"checkable-tag date-tag"} checked>{experience.startDate}</CheckableTag></Timeline.Item>
                                                        <Timeline.Item color={"gray"} ><CheckableTag className={"checkable-tag date-tag"} checked> {experience.endDate} </CheckableTag></Timeline.Item>
                                                    </Timeline>
                                                </Descriptions.Item>

                                                <Descriptions.Item label="Location">

                                                    {experience.location}

                                                </Descriptions.Item>





                                            </Descriptions>

                                            <Divider />

                                            <Row justify='center'>

                                                <Descriptions className={"experience-description"}>

                                                    <DescriptionsItem>
                                                        <Space direction="vertical" wrap size={12}>

                                                            {experience.description.map((description, index) => (
                                                                <Badge status="default" color={"gray"} key={index} text={description} />

                                                            ))}
                                                        </Space>
                                                    </DescriptionsItem>

                                                </Descriptions>
                                            </Row>



                                            <Divider />

                                            <Descriptions labelStyle={{ "fontWeight": "bold" }} className={"experience-description"} title="Skills">

                                                <Descriptions.Item>
                                                    <Space wrap>
                                                        {experience.skills.map((skill, index) => (<Tag className={"normal-tag"} key={index}>{skill}</Tag>))}
                                                    </Space>
                                                </Descriptions.Item>


                                            </Descriptions>

                                        </Card>
                                    </Badge.Ribbon>
                                </div>
                            </TabPane>
                        ))}
                    </Tabs>

                    /*
                    MOBILE SCREEN
                    */
                )
                }
            </div>

            {/* MOBILE SCREEN */}

            <div className={"experiencesMobile"}>
                <Select
                    dropdownMatchSelectWidth
                    defaultValue={selection}
                    onChange={(value) => { setSelection((value)) }}
                    size='large'
                    className={styles.experiencesSelect}
                    options={selectionOptions}
                />

                {getExperienceTileMobile(selection, experiences)}

            </div>
        </>

    )
}

const getExperienceTileMobile = (key: string, dataExperiences: experience[]) => {

    const experience: experience = dataExperiences[Number.parseInt(key)]


    return (
        <Badge.Ribbon className={styles.experienceTileMobileRibbon} text={experience.endDate === "Present" ? "Present" : "Ended"} color={"gray"}>
            <Card className={styles.experienceTileMobile}>
                <Title level={1}> {experience.company}  </Title>
                <Divider />
                <Title level={4}> {experience.title}  </Title>
                <Divider />
                <Title level={5}> {experience.highLevelDescription} </Title>
                <Divider />
                <Title level={5}> {experience.startDate} - {experience.endDate} </Title>
                <Divider />

                <Card className={styles.experienceTileSkillsMobile}>
                    {experience.skills.map((skill, index) => (<Tag className={"normal-tag"} key={index}>{skill}</Tag>))}
                </Card>

                <Divider />

                <div className={styles.experienceTileDescriptionMobile}>

                    {experience.description.map((item: string) => {
                        return (<> {item} <Divider />  </>)
                    })}
                </div>
                <Text type={"secondary"}> {experience.location} </Text>

            </Card>
        </Badge.Ribbon>
    )
}


const getExperienceTitle = (companyURL: string, company: string, title: string) => {
    return (
        <Space>
            {<div> {company + " - " + title} </div>}
            {getViewCompanyButton(companyURL)}
        </Space>

    )

}

const getViewCompanyButton = (companyURL: string) => {
    return <a href={companyURL} target={"_blank"} rel={"noopener noreferrer"}><Button className='normal-button'> View Company </Button> </a>
}

export default Experiences;