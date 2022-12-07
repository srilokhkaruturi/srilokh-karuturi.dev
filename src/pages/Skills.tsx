import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from '../styles/Skills.module.scss'
// components
import { Space, Typography, Row, Card, Divider, Modal } from 'antd'
const { Text, Title } = Typography
import SkeletonEverything from './components/SkeletonEverything'
import Inference from './components/Inference'

type skill = {
  name: string,
  url: string;
}

type skillsDataInterface = {
  skills: skill[]
}

const toInferInitState = {

}


const Skills: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [infoModal, setInfoModal] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("")
  const [modalContentKey, setModalContentKey] = useState(1)
  const [skillsData, setSkillsData] = useState<skill[]>([])

  const toggleModal = () => {
    setInfoModal(!infoModal)
    setModalContentKey(modalContentKey + 1)
  }

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
          <a key={index} onClick={() => { toggleModal(); setCurrentSkill(skillData.name) }}>
            <Card className={styles.cardSkill} key={index}>
              <Title level={3} key={index}>{skillData.name}</Title>
            </Card>
          </a>
        )
      })}
      {
        infoModal &&
        <Modal key={modalContentKey} open={infoModal} onCancel={() => { toggleModal(); }} onOk={() => toggleModal()} style={{ "width": "fit-content" }}>
          {currentSkill}
          <Inference
            key={modalContentKey}
            toInquire={currentSkill} />
        </Modal>
      }


      {/* <Modal open={infoModal} onCancel={() => { toggleModal(); }} onOk={() => toggleModal()} style={{ "width": "fit-content" }}>
        {currentSkill}
        <Inference
          toInquire={currentSkill} />
      </Modal> */}

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
