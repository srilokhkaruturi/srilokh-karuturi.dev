import { AntDesignOutlined, SnippetsFilled } from "@ant-design/icons";
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Spin } from "antd";
// PROPERTIES OF PAGE
interface pageProps {
    toInquire: string
    key: number,
}



const Inference: NextPage<pageProps> = (props: pageProps) => {
    const [answer, setAnswer] = useState(<Spin />);
    const { toInquire, key } = props

    const inquiryStatement = "What is " + toInquire + "?"

    // GET DATA AND UPDATE STATES
    useEffect(() => {
        let ignore = false;
        inquire(inquiryStatement).then(
            (data) => { !ignore && data && setAnswer(data.result); })
        // .then(() => { setLoading(false) });

        return () => { ignore = true }
    }, [inquiryStatement]);




    return (
        <div key={key}>
            {answer}
        </div>
    )

}


const inquire = async (toInquire: string) => {
    const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ toGenerate: toInquire }),
    });
    const data = await response.json();

    return data
}

export default Inference; 