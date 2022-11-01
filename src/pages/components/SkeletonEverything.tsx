import type { NextPage } from 'next'
import { Skeleton, Row, Col, Space } from 'antd';
const SkeletonEverything: NextPage = () => {
    return (
        <Space wrap>
            <Skeleton.Button style={{ width: "100vw", height: "100vh" }} active />
        </Space>

    )
}

export default SkeletonEverything;
