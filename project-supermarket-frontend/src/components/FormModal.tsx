/**
 * 
 */


import { useState, useEffect } from 'react';
import {
    Modal, Button, Menu, DatePicker,
    Form, Input, Select, Divider
} from 'antd';
import {
    LoginOutlined, LogoutOutlined, FormOutlined
} from "@ant-design/icons";
import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';
import { User } from '../contexts/Types';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="05">+05</Option>
            <Option value="02">+02</Option>
            <Option value="03">+03</Option>
            <Option value="04">+04</Option>
            <Option value="07">+07</Option>
            <Option value="08">+08</Option>
            <Option value="09">+09</Option>
            {/* <Option value="1800">+1800</Option> */}
        </Select>
    </Form.Item>
);


export default function FormModal(props: { isDrawer: boolean }) {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const [form] = Form.useForm();
    const { loggedUser, setLoggedUser } = useUserContext();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [serverErrorMessage, setServerErrorMessage] = useState<string>("");


    useEffect(() => {
        reLogUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setServerErrorMessage("");
    }, [isModalOpen]);


    async function reLogUser() {
        try {
            const token = localStorage.getItem('loggedUser');
            if (token) {
                const res = await axios.get(`${baseUrl}/users/logged`,
                    { headers: { authorization: `Bearer ${token}` } });
                setLoggedUser(res.data.user._doc);
            }
        } catch (error) {
            if (error instanceof Error) 
                console.log("Error at reLogUser: ", error.message);
            console.error(error);
        }
    }


    async function onFinish(values: any) {
        setServerErrorMessage("");
        if (isSignUp) {
            values.phone = (values.prefix ? `${values.prefix}-` : "") + values.phone;
            delete values.prefix;
        }
        const userDetails = { ...values } as User;
        let res;
        try {
            if (isSignUp)
                res = await axios.post(`${baseUrl}/users/signUp`, userDetails);
            else
                res = await axios.post(`${baseUrl}/users/signIn`, userDetails);
            

            if (res.data.user._doc) {
                setLoggedUser(res.data.user._doc);
                localStorage.setItem('loggedUser', res.data.token);
            }
            closeModal();
        } catch (error: any) {
                console.log("Error at onFinish: ", error);
                setServerErrorMessage(error.response.data);
            console.error(error);
        }
    };


    const closeModal = () => {
        setIsModalOpen(false);
    };
    function signInClick() {
        setIsSignUp(false);
        setIsModalOpen(prev => !prev);
    }
    function signUpClick() {
        setIsSignUp(true);
        setIsModalOpen(prev => !prev);
    }
    function signOutClick() {
        setLoggedUser(null);
        localStorage.clear();
    }


    const signUpFields =
        <>
            <Form.Item
                name="passwordConfirm"
                label="Confirm"
                dependencies={['password']}
                hasFeedback
                rules={[{
                    required: true,
                    message: 'Please confirm your password',
                }, {
                    min: 4,
                    message: 'Password must be at least 4 characters',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value)
                            return Promise.resolve();
                        return Promise.reject(
                            new Error('The passwords do not match'));
                    },
                })]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="name"
                label="Name"
                tooltip="What do you want others to call you?"
                rules={[{
                    required: true,
                    message: 'Please enter a name',
                    whitespace: true
                }, {
                    min: 3,
                    message: 'Name must be at least 3 characters',
                }, {
                    max: 20,
                    message: 'Name must be no more than 20 characters',
                }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="birthDate"
                label="Date of Birth"
                rules={[{
                    required: true,
                    message: 'Please select your date of birth'
                },
                () => ({
                    validator(_, value) {
                        const sixteenYearsAgo = new Date();
                        sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);
                        if (value < sixteenYearsAgo)
                            return Promise.resolve();
                        return Promise.reject(
                            new Error('Must be at least 16 to register'));
                    },
                })]}>
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                    {
                        min: 4,
                        message: 'Phone number must be at least 6 digits (including prefix)',
                    }, {
                        max: 18,
                        message: 'Phone number must be no more than 20 digits (including prefix)',
                    }
                ]}
            >
                <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            </Form.Item>
        </>

    const loginButtons =
        <>
            <Button type="primary"
                onClick={signInClick}
                style={{ marginRight: "10px" }}>
                <LoginOutlined /> Sign In
            </Button>
            <Button onClick={signUpClick} type="primary" >
                <FormOutlined /> Sign Up
            </Button>
        </>

    const logoutButton =
        <Button type="primary"
            onClick={signOutClick}
            style={{ marginRight: "10px" }}>
            <LogoutOutlined /> Sign Out
        </Button>


    return (
        <>
            <Menu.Item key="register" className="logButtons"
                style={{
                    paddingInline: 5,
                    position: "absolute",
                    right: props.isDrawer ? -10 : 10
                }}
            >
                {loggedUser ? logoutButton : loginButtons}
            </Menu.Item>

            <Modal 
                open={isModalOpen} onCancel={closeModal}
                style={{fontFamily: "'Lora', serif",}}
                footer={[]}
            >

                <>
                    <div style={{
                        fontSize: 18,
                        fontWeight: 600
                    }}>
                        {isSignUp ? "SignUp" : "SignIn"}
                    </div>
                    <Divider />
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{
                                type: 'email',
                                message: 'Please enter a valid Email',
                            }, {
                                required: true,
                                message: 'Please enter an Email',
                            } , {
                                max: 30,
                                message: 'Email must be 30 characters at most',
                            }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{
                                required: true,
                                message: 'Please enter a password',
                            }, {
                                min: 4,
                                message: 'Password must be at least 4 characters',
                            } , {
                                max: 30,
                                message: 'Password must be 30 characters at most',
                            }]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        {isSignUp ? signUpFields : ''}

                        <Form.Item 
                            wrapperCol={{ offset: 8, span: 16 }}>
                            <p style ={{ color: "red" }}>
                                {serverErrorMessage}
                            </p>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button key="back" onClick={closeModal}>
                                Return
                            </Button>
                        </Form.Item>

                    </Form>
                </>

            </Modal>
        </>
    );
}

