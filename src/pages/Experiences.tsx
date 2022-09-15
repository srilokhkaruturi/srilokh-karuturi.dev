import type { NextPage } from 'next'
import { Tabs, Typography, Descriptions, Tag, Space, Menu, Row, Card, Divider, Timeline, Badge } from 'antd'
import experiencesData from '../data/experiences.json'
import { useState } from 'react'
import MenuDivider from 'antd/lib/menu/MenuDivider';
import DescriptionsItem from 'antd/lib/descriptions/Item';


const { CheckableTag } = Tag;
const { TabPane } = Tabs
const { Title, Text } = Typography

type experience = {
    companyShortName: string;
    company: string,
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
    const [activeTab, setActiveTab] = useState(0)

    const handleChange = (activeTab: number) => {
        setActiveTab(activeTab)
    }

    const experiences: experience[] = experiencesData.experiences;

    return (
        <div className="experiences">
            {experiences && experiences.length > 0 && (
                <Tabs defaultActiveKey="0" tabPosition='left' onChange={() => handleChange}>

                    {experiences.map((experience, index) => (

                        <TabPane tab={<Title level={3}>{experience.companyShortName === "N/A" ? experience.company : experience.companyShortName}</Title>} key={index}>
                            <div className="experience">
                                <Badge.Ribbon text="Present" color="gray">
                                    <Card className="experience-Tile">

                                        <Descriptions labelStyle={{ "fontWeight": "bold" }} className={"experience-description"} title={experience.company + " - " + experience.title} >

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
            )
            }
        </div >

    )
}

export default Experiences;