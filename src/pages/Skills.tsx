import { Space, Typography, Row, Card, Divider } from 'antd'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import skillsData from "../data/skills.json"
import SkeletonContacts from './components/SkeletonContacts'
const { Text, Title } = Typography

interface skillsDataInterface {
  skills: string[]
}

const Skills: NextPage = () => {
  // GET DATA FROM JSON FILE
  // const data: string[] = Array.from(new Set(skillsData.skills));
  const [loading, setLoading] = useState(true)
  const [skillsData, setSkillsData] = useState<string[]>([])

  // GET DATA AND UPDATE STATES
  useEffect(() => {
    getSkillData().then(
      (data: skillsDataInterface | void) => { data && setSkillsData(data.skills) })
      .then(() => { setLoading(false) });
  }, []);

  // IF WE ARE LOADING THEN DISPLAY SKELETONS
  if (loading) {
    return (
      <SkeletonContacts />
    )
  }
  // IF WE HAVE DATA THEN DISPLAY ALL OF THE SKILLS
  return (
    <Space size={1} wrap>
      {skillsData.map((skill: string, index: number) => (
        <Row align="middle" justify='center' typeof='flex' key={index}>
          <Card className="card-skill" key={index}>
            <Title level={3} key={index}>{skill}</Title>
          </Card>
        </Row>
      ))}
    </Space>

  )
}


// GET DATA OF skills AT PAGE REQUEST
const getSkillData = async () => {

  // REDIRECT
  var redirectOption: RequestRedirect = "follow"

  // REQUEST OPTIONS
  var requestOptions = {
    method: 'GET',
    redirect: redirectOption
  };

  // PERFORM GET REQUEST
  const response = await fetch("/api/getSkillData", requestOptions)

  // CONVERT RESPONSE INTO JSON
  const responseObject = await response.json()

  // RETURN JSON OBJECT
  return responseObject
}



export default Skills
