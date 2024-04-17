import type { NextPage } from "next";
import styles from '../../../styles/Header.module.scss'

// components
import { Typography, Divider, Tooltip } from "antd";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import { AiTwotoneMail } from 'react-icons/ai';
import { BsStackOverflow } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";
import { useEffect, useState } from "react";
import FadeIn from 'react-fade-in/lib/FadeIn';

import SkeletonHeader from "./SkeletonHeader";

const HeaderMain: NextPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { Title, Text } = Typography;
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
        return <SkeletonHeader />
    }

    if (!isLoading) {
        return (
            <FadeIn >

                <div className={styles.headerMain}>
                    <div className={styles.headerTitle}>
                        <text className={styles.titleText}> Srilokh Karuturi </text>
                        <a className={styles.titleCurrentRole} type={"secondary"}>Software Engineer</a>
                    </div>

                    <div className={styles.socialsHeader}>

                        <Tooltip key={""} title="LinkedIn" className="headerSocialIcon" > <a href={"https://www.linkedin.com/in/srilokh-karuturi/"}><LinkedinFilled rev="default" style={{ fontSize: "30px" }} /> </a> </Tooltip>
                        <Tooltip key={""} title="Github" className="headerSocialIcon"><a href={"https://github.com/srilokhkaruturi"} ><GithubFilled rev="default" style={{ fontSize: "30px" }} /></a></Tooltip>
                        <Tooltip key={""} title="StackOverflow" className="headerSocialIcon"><a href={"https://stackoverflow.com/users/16441524/sigh"}><BsStackOverflow style={{ fontSize: "30px" }} /></a></Tooltip>
                        <Tooltip key={""} title="Email" className="headerSocialIcon"><a><AiTwotoneMail style={{ fontSize: "30px" }} /> </a> </Tooltip>
                    </div>





                </div>

                <Divider className={styles.headerLine} />



            </FadeIn>

        )
    }

    return null;

}


export default HeaderMain; 