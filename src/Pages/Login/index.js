import { Row, Col, message, Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"; // Import icon
import { useState } from "react";
import { userLogin } from "../../Services/Login";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../Helpers/cookies";
import { Link } from "react-router-dom";

function Login() {
    const [form] = Form.useForm();
    const [messageAPI, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false); // Thêm state

    const handleSubmit = async (values) => {
        try {
            const result = await userLogin(values.email, values.pass);
            if (result.length > 0) {
                console.log(result);
                await messageAPI.loading("Đang đăng nhập ...");
                setCookie("id", result[0].id, 3);
                setCookie("fullName", result[0].fullName, 3);
                setCookie("email", result[0].email, 3);
                setCookie("token", result[0].token, 3);
                navigate("/");
            } else {
                messageAPI.error("Sai tên đăng nhập hoặc mật khẩu");
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="login">
                <Row gutter={[20, 20]}>
                    <Col span={8} offset={8}>
                        <h3>ĐĂNG NHẬP TÀI KHOẢN CỦA BẠN</h3>
                        <Form layout="vertical" form={form} name="Login" onFinish={handleSubmit}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn chưa nhập email",
                                    },
                                    {
                                        type: "email",
                                        message: "Địa chỉ email không hợp lệ",
                                    },
                                ]}
                            >
                                <Input className="oke" placeholder="name@gmail.com" />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="pass"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn chưa nhập password",
                                    },
                                ]}
                            >
                                <Input
                                    type={passwordVisible ? "text" : "password"}
                                    className="oke"
                                    placeholder="password"
                                    suffix={
                                        passwordVisible ? (
                                            <EyeTwoTone
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                onClick={() => setPasswordVisible(!passwordVisible)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        )
                                    }
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng nhập
                                </Button>
                                <Link to="/register">
                                    <Button style={{marginLeft: '10px' }}>
                                        Bạn chưa có tài khoản ?
                                    </Button>
                                </Link>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Login;
