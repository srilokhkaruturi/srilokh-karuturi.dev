import { Layout, Menu, Skeleton } from "antd";
import SkeletonButton from "antd/lib/skeleton/Button";
import type { NextPage } from "next";

const { Content } = Layout;

const SkeletonHeader: NextPage = () => {
    return (
        <>
            <Skeleton.Button style={{ width: "100vw", height: "70px" }} active />
            <Layout>
                <Menu mode="horizontal" style={{ paddingTop: "1rem" }} >
                    <Menu.Item><SkeletonButton /></Menu.Item>
                    <Menu.Item><SkeletonButton /></Menu.Item>
                    <Menu.Item><SkeletonButton /></Menu.Item>
                    <Menu.Item><SkeletonButton /></Menu.Item>
                    <Menu.Item><SkeletonButton /></Menu.Item>
                </Menu>
                <Content> <SkeletonButton style={{ width: "100vw", height: "100vh" }} active /> </Content>
            </Layout>
        </>
    )

}

export default SkeletonHeader; 