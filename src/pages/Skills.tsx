import { Space, Typography, Row, Card, Divider } from 'antd'
import type { NextPage } from 'next'
import skillsData from "../data/skills.json"
const { Text, Title } = Typography

const Skills: NextPage = () => {
  const data: string[] = Array.from(new Set(skillsData.skills));

  return (
    <Space size={1} wrap>
      {data.map((skill: string, index: number) => (
        <Row align="middle" justify='center' typeof='flex'>
          <Card className="card-skill" key={index}>
            <Title level={3} key={index}>{skill}</Title>
          </Card>
        </Row>
      ))}
    </Space>

  )
}

export default Skills
