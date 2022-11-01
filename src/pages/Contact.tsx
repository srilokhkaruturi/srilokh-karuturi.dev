import { GithubFilled, LinkedinFilled } from '@ant-design/icons'
import { MdContactPage } from 'react-icons/md'
import { Card, Space, Typography, Image, Row } from 'antd'
import type { NextPage } from 'next'
import { AiTwotoneMail } from 'react-icons/ai'
import { BsStackOverflow } from 'react-icons/bs'
import FadeIn from 'react-fade-in'
import { SiDevpost } from 'react-icons/si'
const { Title, Text } = Typography
import contactsData from '../data/contacts.json'
import { addDoc, collection, CollectionReference, doc, Firestore, getDoc, getDocs, getFirestore, QuerySnapshot } from "firebase/firestore"
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import SkeletonContacts from './components/SkeletonContacts'
import SkeletonEverything from './components/SkeletonEverything'

type contactInfoType = {
  name: string,
  link: string,
}

type API_DATA = {
  contacts: contactInfoType[]
}

/*
LinkedinFilled
GithubFilled
BsStackOverflow
FaProjectDiagram
*/

const Contact: NextPage = () => {
  // const contacts: contactInfoType[] = contactsData.contacts
  const [loading, setLoading] = useState(true);
  const [contactsData, setContactsData] = useState<contactInfoType[]>([]);

  useEffect(() => {
    getContactsData().then(
      (data: API_DATA | void) => { data && setContactsData(data.contacts) })
      .then(() => { setLoading(false) });
  }, []);

  if (loading) {
    return (
      <SkeletonEverything />
    )
  }


  return (
    <FadeIn>
      <Space wrap>
        {contactsData.map((contact: contactInfoType, index: number) => (
          <Card className="card-contact" key={index}>
            <Row align="middle" justify='center' typeof='flex'>
              <Title>
                <a href={contact.link} target="_blank" rel={"noopener noreferrer"}>{contact.name}</a>
              </Title>
            </Row>
            <Row align="middle" justify="center" typeof="flex" style={{ "fontSize": "50px" }}>
              {getLogo(contact.name)}

            </Row>

          </Card>
        ))}
      </Space>
    </FadeIn>

  )
}


function getLogo(name: String) {

  const nameLowerCase: String = name.toString().toLowerCase()

  switch (nameLowerCase) {
    case "linkedin":
      return <LinkedinFilled />

    case "github":
      return <GithubFilled />

    case "stackoverflow":
      return <BsStackOverflow />

    case "email":
      return <AiTwotoneMail />
    case "devpost":
      return <SiDevpost />
    default:
      return <MdContactPage />
  }
}

// GET DATA OF CONTACT AT PAGE REQUEST
const getContactsData = async () => {

  var redirectOption: RequestRedirect = "follow"

  var requestOptions = {
    method: 'GET',
    redirect: redirectOption
  };
  // if you used a express node.js server running on localhost:3001 
  const response = await fetch("/api/getContactData", requestOptions)
  const responseObject = await response.json()
  console.log(responseObject)
  return responseObject

}

export default Contact
