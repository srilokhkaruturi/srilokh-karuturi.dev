import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import experiencesData from '../data/experiences.json'

import styles from '../styles/Experiences.module.scss'

// components
import { Badge, Button, Card, Descriptions, Divider, Row, Select, Space, Tabs, Tag, Timeline, Typography } from 'antd'
import DescriptionsItem from 'antd/lib/descriptions/Item'
import SkeletonEverything from './components/SkeletonEverything'


const { CheckableTag } = Tag;
const { TabPane } = Tabs
const { Title, Text } = Typography

type role = {
    title: string,
    startDate: string,
    endDate: string,
    location: string,
    teamDescription: string,
    highLevelDescription: string,
    description: string[],
    skills: string[]
}

type experience = {
    companyShortName: string;
    company: string,
    companyURL: string,
    roles: role[]

}

type experiencessDataInterface = {
    experiences: experience[]
}

const Experiences: NextPage = () => {
    // STATES
    const [selection, setSelection] = useState<string>()
    const [experiencesData, setExperiencesData] = useState<experience[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState(true);

    // GET DATA AND UPDATE STATES
    useEffect(() => {
        getExperiencesData().then(
            (data: experiencessDataInterface) => { data && setExperiencesData(data.experiences); })
            .then(() => { setLoading(false) });
    }, []);

    if (loading) {
        return (
            <SkeletonEverything />
        )
    }

    // DEFINE OPTIONS FOR SELECTION (MENU OPTIONS)
    const getOptions = (dataExperiences: experience[]) => {
        var returnList: any[] = []
        dataExperiences.forEach((dataExperience: experience, key) => {
            returnList.push({
                key: key,
                label: dataExperience.companyShortName == "N/A" ? dataExperience.company : dataExperience.companyShortName,
                value: key
            })
        })

        return returnList
    }

    const selectionOptions: any[] = getOptions(experiencesData)

    const handleChange = (activeTab: number) => {
        setActiveTab(activeTab)
    }


    return (
        <>

            {/* DEFAULT SCREEN */}

            <div className={styles.experiencesMenu}>
                {experiencesData && experiencesData.length > 0 && (


                    <Tabs className={styles.experiencesMenuTabs} defaultActiveKey="0" tabPosition='left' onChange={() => handleChange}>

                        {experiencesData.map((experience, index) => (

                            <TabPane tab={<Title level={3}>{experience.companyShortName === "N/A" ? experience.company : experience.companyShortName}</Title>} key={index}>

                                {experience.roles.map((role: role, index) => {
                                    return (


                                        <div className="experience" key={index}>
                                            <Badge.Ribbon key={index} text={role.endDate === "Present" ? "Present" : "Ended"} color={"gray"}>
                                                <Card key={index} className={styles.experienceTile}>

                                                    <Descriptions labelStyle={{ "fontWeight": "bold" }} className={"experience-description"} title={getExperienceTitle(experience.companyURL, experience.company, role.title)}>

                                                        <Descriptions.Item label="Team">{role.teamDescription}</Descriptions.Item>

                                                        <Descriptions.Item label="Description">
                                                            <Space direction="horizontal">
                                                                {role.highLevelDescription}

                                                            </Space>
                                                        </Descriptions.Item>

                                                        <Descriptions.Item label="Duration">
                                                            <Timeline pendingDot>
                                                                <Timeline.Item color={"gray"} ><CheckableTag className={"checkable-tag date-tag"} checked>{role.startDate}</CheckableTag></Timeline.Item>
                                                                <Timeline.Item color={"gray"} ><CheckableTag className={"checkable-tag date-tag"} checked> {role.endDate} </CheckableTag></Timeline.Item>
                                                            </Timeline>
                                                        </Descriptions.Item>

                                                        <Descriptions.Item label="Location">

                                                            {role.location}

                                                        </Descriptions.Item>





                                                    </Descriptions>

                                                    <Divider />

                                                    <Row justify='center'>

                                                        <Descriptions className={"experience-description"}>

                                                            <DescriptionsItem>
                                                                <Space direction="vertical" wrap size={12}>

                                                                    {role.description.map((description, index) => (
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
                                                                {role.skills.map((skill, index) => (<Tag className={"normal-tag"} key={index}>{skill}</Tag>))}
                                                            </Space>
                                                        </Descriptions.Item>


                                                    </Descriptions>

                                                </Card>
                                            </Badge.Ribbon>
                                        </div>

                                    )
                                })}
                            </TabPane>
                        ))}
                    </Tabs>
                )
                }
            </div>

            {/* MOBILE SCREEN */}

            <div className={"experiencesMobile"}>
                <Select
                    dropdownMatchSelectWidth
                    defaultValue={selection}
                    onChange={(value: {}) => { setSelection((value)) }}
                    size='large'
                    className={styles.experiencesSelect}
                    options={selectionOptions}
                />

                {selection && getExperienceTilesMobile(selection, experiencesData)}

            </div>
        </>

    )
}

const getExperienceTilesMobile = (key: string, dataExperiences: experience[]) => {

    const experience: experience = dataExperiences[Number.parseInt(key)]


    return (

        experience.roles.map((role: role, index: number) => {
            return (
                <Badge.Ribbon key={index} className={styles.experienceTileMobileRibbon} text={role.endDate === "Present" ? "Present" : "Ended"} color={"gray"}>
                    <Card className={styles.experienceTileMobile}>

                        {<Title level={1}> {experience.companyShortName === "N/A" ? experience.company : experience.companyShortName} </Title>}
                        {getViewCompanyButton(experience.companyURL)}
                        <Divider />
                        <Title level={4}> {role.title}  </Title>
                        <Divider />
                        <Title level={5}> {role.highLevelDescription} </Title>
                        <Divider />
                        <Title level={5}> {role.startDate} - {role.endDate} </Title>
                        <Divider />

                        <Card className={styles.experienceTileSkillsMobile}>
                            {role.skills.map((skill, index) => (<Tag className={"normal-tag"} key={index}>{skill}</Tag>))}
                        </Card>

                        <Divider />

                        <div className={styles.experienceTileDescriptionMobile}>

                            {role.description.map((item: string) => {
                                return (<> {item} <Divider />  </>)
                            })}
                        </div>
                        <Text type={"secondary"}> {role.location} </Text>

                    </Card>
                </Badge.Ribbon>

            )

        })


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


// GET DATA OF skills AT PAGE REQUEST
const getExperiencesData = async () => {

    // REDIRECT
    var redirectOption: RequestRedirect = "follow"

    // REQUEST OPTIONS
    var requestOptions = {
        method: 'GET',
        redirect: redirectOption
    };

    // PERFORM GET REQUEST
    const response = await fetch("/api/getExperiencesData", requestOptions)


    // CONVERT RESPONSE INTO JSON
    const responseObject = await response.json()

    // RETURN JSON OBJECT
    return responseObject
}


export default Experiences;