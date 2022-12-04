import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Skills.module.scss'
// components
import { Space, Typography, Row, Card, Divider } from 'antd'
const { Text, Title } = Typography
import SkeletonEverything from './components/SkeletonEverything'

interface skillsDataInterface {
  skills: string[]
}

const Skills: NextPage = () => {
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
      <SkeletonEverything />
    )
  }
  // IF WE HAVE DATA THEN DISPLAY ALL OF THE SKILLS
  return (
    <div className={styles.skillsWrapper}>
      {skillsData.map((skill: string, index: number) => (
        <Card className={styles.cardSkill} key={index}>
          <Title level={3} key={index}>{skill}</Title>
        </Card>

      ))}
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
