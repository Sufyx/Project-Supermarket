/**
 * 
 */

import React, { useState, useEffect } from "react";
import {
    Layout, Menu, Button, Drawer, Row, Col, Input
} from "antd";
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import FormModal from "./FormModal";
import { useUserContext } from '../contexts/UserContext';

const { Header } = Layout;


export default function NavBar() {

    const { loggedUser } = useUserContext();
    const { Search } = Input;
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    function onSearch(value: string) {
        console.log(value);
    }

    useEffect(() => {
        if (loggedUser)
            setUserName(loggedUser.name);
    }, [loggedUser])


    const showDrawer = () => {
        setDrawerVisible(true);
    };
    const onClose = () => {
        setDrawerVisible(false);
    };


    return (
        <div>
            <Layout className="layout" >
                <Header style={{ padding: 0 }}>
                    <Row justify="space-between" align="middle">

                        <Col xs={20} sm={20} md={2}>
                            <div className="logo"
                                style={{ color: "white", paddingLeft: "20px" }}>
                                Logo
                            </div>
                        </Col>

                        <Col xs={0} sm={0} md={22}>
                            <Menu theme="dark" mode="horizontal"
                                // defaultSelectedKeys={["1"]}
                                >

                                {/* <Menu.Item key="home" icon={<HomeOutlined />} >
                                    Home
                                </Menu.Item>

                                <Menu.Item key="profile" icon={<UserOutlined />} >
                                    Profile
                                </Menu.Item> */}

                                <Menu.Item key="settings" icon={<SettingOutlined />} >
                                    Settings
                                </Menu.Item>

                                <Menu.Item key="search">
                                    <Search style={{ marginTop: "7%" }}
                                        placeholder="input search text"
                                        onSearch={onSearch} enterButton />
                                </Menu.Item>

                                <Menu.Item key="user-name" className="userGreet"
                                    style={{
                                        pointerEvents: "none",
                                        margin: "0 1vw 0 5vw",
                                        paddingInline: 0,
                                    }}>
                                    {loggedUser ? ("Hi, " + userName) : 'Please sign in / sign up'}
                                </Menu.Item>

                                <FormModal isDrawer={false} />

                            </Menu>
                        </Col>

                        <Col xs={2} sm={2} md={0} style={{ marginRight: "3%" }}>
                            <Button type="primary" onClick={showDrawer}>
                                <MenuOutlined />
                            </Button>
                        </Col>
                    </Row>

                    <Drawer
                        title="Menu"
                        placement="right"
                        onClick={onClose}
                        onClose={onClose}
                        open={drawerVisible}>
                        <Menu mode="vertical" defaultSelectedKeys={["1"]}>
                            <Menu.Item key="1" icon={<HomeOutlined />}>
                                Home
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UserOutlined />}>
                                Profile
                            </Menu.Item>
                            <Menu.Item key="3" icon={<SettingOutlined />}>
                                Settings
                            </Menu.Item>

                            <FormModal isDrawer={true} />
                            {/* <Menu.Item key="4" >
                                <Button type="primary"
                                    onClick={() => setSignInClicked((prev) => !prev)}
                                    style={{ marginRight: "10px" }}>
                                    Sign in
                                </Button>
                                <Button onClick={() => setSignUpClicked((prev) => !prev)} >
                                    Sign up
                                </Button>
                            </Menu.Item> */}

                        </Menu>
                    </Drawer>

                </Header>
            </Layout>

        </div>
    );
};
