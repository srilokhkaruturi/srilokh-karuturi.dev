import { Layout, Menu, Tabs, Typography } from 'antd'
import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import About from './About';
import Contact from './Contact';
import NFTs from './NFTs';
import Resume from './Resume';
import HeaderMain from './components/HeaderMain'
import SkeletonMain from './components/SkeletonMain'
import Projects from './Projects';
import Skills from './Skills';
import Experiences from './Experiences';
import Head from 'next/head';
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;
const Home: NextPage = () => {
  const [tab, setTab] = useState('About');

  const onChangeTab = (key: string) => {
    if (key == "About") {
      setTab(key);
      setContent(<About key={""} onChangeTab={onChangeTab} />)
    }
    if (key == "Resume") {
      setTab(key);

      setContent(<Resume key={""} />)
    }
    if (key == "Projects") {
      setTab(key);

      setContent(<Projects key={""} />)
    }
    if (key == "Skills") {
      setTab(key);
      setContent(<Skills key={""} />)
    }
    if (key == "Contact") {
      setTab(key);


      setContent(<Contact key={""} />)
    }
    if (key == "Experiences") {
      setTab(key);


      setContent(<Experiences key={""} />)
    }
    if (key == "NFTs") {
      setTab(key);

      setContent(<NFTs key={""} />)
    }
  };

  const [content, setContent] = useState(<About key={"about"} onChangeTab={onChangeTab} />);
  const [isLoading, setIsLoading] = useState(true);
  const { TabPane } = Tabs
  useEffect(() => {
    // activate loading state when component mounts
    setIsLoading(true);
    var max = 1;
    var min = 0;
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    const timer = setTimeout(() => {
      // disable loading after 5 seconds
      setIsLoading(false);
    }, rand * 1000);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonMain />
  }


  return (
    <>
      <Head>
        <title>Srilokh Karuturi</title>
        <meta property="og:title" content="Srilokh Karuturi" key="title" />
      </Head>
      <HeaderMain />
      <Layout className='mainLayout' key={"default"}>
        <Tabs activeKey={tab} defaultActiveKey="About" onChange={onChangeTab} style={{ height: '100%', paddingLeft: "1rem", paddingRight: "1rem" }}  >
          <TabPane tab={<Title level={5}>About</Title>} key="About"> {content} </TabPane>
          <TabPane tab={<Title level={5}>Resume</Title>} key="Resume"> {content} </TabPane>
          <TabPane tab={<Title level={5}>Experiences</Title>} key="Experiences" > {content} </TabPane>
          <TabPane tab={<Title level={5}>Projects</Title>} key="Projects"> {content} </TabPane>
          <TabPane tab={<Title level={5}>NFTs</Title>} key="NFTs" > {content} </TabPane>
          <TabPane tab={<Title level={5}>Skills</Title>} key="Skills" >  {content} </TabPane>
          <TabPane tab={<Title level={5}>Contact</Title>} key="Contact" > {content} </TabPane>
        </Tabs>
      </Layout>

    </>
  )
}

export default Home
