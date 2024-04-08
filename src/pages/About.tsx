import type { NextPage } from 'next'
import { Avatar, Layout, Typography, Card, Col, Row, Divider, Space, Tooltip } from 'antd';
import Typewriter from 'typewriter-effect';
import FadeIn from 'react-fade-in/lib/FadeIn';
import { useState } from 'react';
import app from 'next/app';
import { GithubFilled, LinkedinFilled } from '@ant-design/icons';
import { TbBrandNextjs } from 'react-icons/tb';
import { DiJavascript1, DiReact } from 'react-icons/di';
import { SiTypescript } from 'react-icons/si';

interface AboutProps {
  onChangeTab: (key: string) => void;
}

const About: NextPage<AboutProps> = (props) => {
  const { onChangeTab } = props;

  // EXPORT TITLE
  const { Title, Text } = Typography;



  return (
    <Layout>
      <Layout.Content style={{ textAlign: "center", backgroundColor: "#F5F5F5" }}>
        <Avatar size={200} src="/sai.jpeg" />

        <div className='Typewriter-Text' style={{ fontSize: "2rem" }}>

          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("AI is pretty cool")
                .typeString(".")
                .start();
            }}

          />
        </div>
        <FadeIn>
          <Title level={5} style={{ fontWeight: '100' }}>Data is hosted on Google Cloud Platform.</Title>


          <div className="card__directory--wrapper" >
            <Card className='card-directory' onClick={() => onChangeTab("Resume")}>
              <Title level={3} className='directory-text' > Resume </Title>
              <Text type='secondary' > Skills, experiences, education, projects in a formal format</Text>
            </Card>

            {/* <Card className='card-directory' onClick={() => onChangeTab("Experiences")}>
              <Title level={3} className='directory-text'> Experiences </Title>
              <Text type='secondary'> Personalized view of relevant job experiences </Text>
            </Card> */}
            <Card className='card-directory' onClick={() => onChangeTab("Projects")}>
              <Title level={3} className='directory-text'> Projects </Title>
              <Text type='secondary'> Collection of relevant projects </Text>
            </Card>
            <Card className='card-directory' onClick={() => onChangeTab("Skills")}>
              <Title level={3} className='directory-text'> Skills </Title>
              <Text type='secondary'> Collection of skills  </Text>
            </Card>
            <Card className='card-directory' onClick={() => onChangeTab("NFTs")}>
              <Title level={3} className='directory-text'> NFTs </Title>
              <Text type='secondary'> Showcase of personal NFTs </Text>
            </Card>
            <Card className='card-directory' onClick={() => onChangeTab("Contact")}>
              <Title level={3} className='directory-text'> Contact </Title>
              <Text type='secondary'> Contact Info  </Text>
            </Card>
          </div>

          {/* <Row justify='center' >
            
          </Row> */}

          <Row justify='center' className="footer" style={{ "paddingTop": 2 }} >
            <Space direction="horizontal">
              <Text strong>
                Created with
              </Text>
              <Tooltip title="Next.JS"><a href={"https://nextjs.org/"}><TbBrandNextjs style={{ fontSize: "30px" }} /></a></Tooltip>
              <Tooltip title="React" > <a href={"https://reactjs.org/"}><DiReact style={{ fontSize: "30px" }} /> </a> </Tooltip>
              <Tooltip title="JavaScript"><a href={"https://www.javascript.com/"}><DiJavascript1 style={{ fontSize: "30px" }} /></a></Tooltip>
              <Tooltip title="TypeScript"><a href={"https://www.typescriptlang.org/"} ><SiTypescript style={{ fontSize: "22px" }} /></a></Tooltip>


            </Space>
          </Row>

        </FadeIn>



      </Layout.Content>
    </Layout>


  )
}

export default About;
