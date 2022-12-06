import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Skills.module.scss'
// components
import { Space, Typography, Row, Card, Divider } from 'antd'
const { Text, Title } = Typography
import SkeletonEverything from './components/SkeletonEverything'

type skill = {
  name: string,
  url: string;
}

type skillsDataInterface = {
  skills: skill[]
}


const Skills: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [skillsData, setSkillsData] = useState<skill[]>([])

  // GET DATA AND UPDATE STATES
  useEffect(() => {
    getSkillData().then(
      (data: skillsDataInterface) => { data && setSkillsData(data.skills); })
      .then(() => { setLoading(false) });
  }, []);

  // IF WE ARE LOADING THEN DISPLAY SKELETONS
  if (loading) {
    return (
      <SkeletonEverything />
    )
  }

  // IF WE HAVE DATA THEN DISPLAY ALL OF THE SKILLS
  return (
    <div className={styles.skillsWrapper}>
      {skillsData.map((skillData: skill, index: number) => {
        return (
          <Card className={styles.cardSkill} key={index}>
            <a href={skillData.url} key={index} target="_blank" rel={"noopener noreferrer"}>
              <Title level={3} key={index}>{skillData.name}</Title>
            </a>
          </Card>
        )
      })}
    </div>
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
