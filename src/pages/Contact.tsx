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
type contactInfoType = {
  name: string,
  link: string,
}


/*
LinkedinFilled
GithubFilled
BsStackOverflow
FaProjectDiagram
*/

const Contact: NextPage = () => {
  const contacts: contactInfoType[] = contactsData.contacts

  return (
    <FadeIn>
      <Space wrap>
        {contacts.map((contact: contactInfoType, index: number) => (
          <Card className="card-contact" key={index}>
            <Row align="middle" justify='center' typeof='flex'>
              <Title>
                <a href={contact.link}>{contact.name}</a>
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



export default Contact
