import { CaretRightOutlined, EditOutlined, EllipsisOutlined, ExpandOutlined, InfoCircleOutlined, RightOutlined, SettingOutlined } from '@ant-design/icons';
import { Collapse, Card, Typography, Row, Col, Avatar, Modal, Button, Space, Tooltip, Layout, Divider, Tag, Drawer } from 'antd'
import type { NextPage } from 'next'
import React from 'react';
import FadeIn from 'react-fade-in/lib/FadeIn';
import ProjectsFile from "../data/projects.json"
const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Meta } = Card;

type Section = {
  "Name": String,
  "Projects": Project[]
}
// DEFINE PROJECT TYPE
type Project = {
  Name: String,
  DescriptionShort: String,
  DescriptionLong: String,
  Skills: String[],
  URLS: URLS
}

type URLS = {
  PrefURL: String,
  DemoURL: String,
  VideoURL: String,
  ImageURL: String,
  GithubURL: String,
  DevPostURL: String,
}

const Projects: NextPage = () => {
  // DEFINE PROJECTS Data
  const SectionsArray: Section[] = ProjectsFile.Sections
  const [isModalVisible, setIsModalVisible] = React.useState(false);


  return (
    <FadeIn>
      {/* ADD PANELS FOR EACH SECTION IN SECTIONSARRAY */}
      <Collapse defaultActiveKey={["0"]}
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      >
        {
          SectionsArray && SectionsArray.map(
            (section: Section, sectionIndex: number) => {
              return (
                <Panel header={<Title level={4}> {section.Name}</Title>} key={sectionIndex}>
                  <Row gutter={[16, 16]} key={sectionIndex}>
                    {section.Projects.map((project: Project, projectIndex: number) => {
                      return (
                        <Col span={"12"} key={projectIndex}>
                          <a href={project.URLS.PrefURL.toString()} target="_blank">
                            <Card
                              className='card-project'
                              hoverable
                              title={project.Name}
                              key={projectIndex}
                            >
                              <Space direction="vertical" >
                                {project.DescriptionShort}
                                <Space wrap>
                                  {project.Skills.map((skill: String, skillIndex: number) => { return <Tag className={"normal-tag"} key={skillIndex}>{skill}</Tag> })}
                                </Space>

                              </Space>



                            </Card>
                          </a>
                        </Col>


                      )
                    })}
                  </Row>
                </Panel>
              )
            }
          )
        }
      </Collapse>
    </FadeIn>
  )
}
export default Projects
