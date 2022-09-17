import { PageHeader, Tooltip, Typography } from "antd";
import { GithubFilled, LinkedinFilled } from "@ant-design/icons";
import { AiTwotoneMail } from 'react-icons/ai';
import { BsStackOverflow } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
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
            <FadeIn>
                <PageHeader
                    className="HeaderMain"
                    title={<a onClick={() => location.assign("/")}>Srilokh Karuturi</a>}
                    subTitle={<a>Software Engineering Intern at IBM</a>}
                    extra={[
                        <Tooltip key={""} title="LinkedIn" > <a href={"https://www.linkedin.com/in/srilokh-karuturi/"}><LinkedinFilled style={{ fontSize: "30px" }} /> </a> </Tooltip>,
                        <Tooltip key={""} title="Github"><a href={"https://github.com/sai-k02"} ><GithubFilled style={{ fontSize: "30px" }} /></a></Tooltip>,
                        <Tooltip key={""} title="StackOverflow"><a href={"https://stackoverflow.com/users/16441524/sigh"}><BsStackOverflow style={{ fontSize: "30px" }} /></a></Tooltip>,
                        // <Tooltip key={""} title="Profolio"><a href={"https://stackoverflow.com/users/16441524/sigh"}><FaProjectDiagram style={{ fontSize: "30px" }} /></a></Tooltip>,
                        <Tooltip key={""} title="Email"><a><AiTwotoneMail style={{ fontSize: "30px" }} /> </a> </Tooltip>,
                    ]}

                />
            </FadeIn>
        )
    }

    return null;

}


export default HeaderMain; 