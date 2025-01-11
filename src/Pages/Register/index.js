import { Row, Col, message, Form, Input, Button } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"; // Import icon
import { useState } from "react";
import { register, checkEmail } from "../../Services/Login";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../Helpers/tokens";

function Register() {
    const [form] = Form.useForm();
    const [messageAPI, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false); // Thêm state cho password
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Thêm state cho confirmPassword

    const handleSubmit = async (e) => {
        const haveEmail = await checkEmail(e.email);
        if (haveEmail.length > 0) {
            messageAPI.error("Email đã tồn tại! Vui lòng chọn email khác");
        } else {
            const str = generateToken();
            const object = {
                fullName: e.fullName,
                email: e.email,
                password: e.password,
                token: str,
            };
            const result = await register(object);
            if (result) {
                await messageAPI.loading("Đang tạo tài khoản ...");
                navigate("/login");
            } else {
                messageAPI.error("Tạo tài khoản bị lỗi! Vui lòng kiểm tra kết nối mạng");
            }
        }
    };

    return (
        <>
            {contextHolder}
            <div className="login">
                <Row gutter={[20, 20]}>
                    <Col span={8} offset={8}>
                        <h3>ĐĂNG KÝ TÀI KHOẢN CỦA BẠN</h3>
                        <Form layout="vertical" form={form} name="Register" onFinish={handleSubmit}>
                            <Form.Item
                                label="Họ và tên"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn chưa nhập tên",
                                    },
                                ]}
                            >
                                <Input className="oke" placeholder="Họ và tên" />
                            </Form.Item>

                            <Form.Item
                                label="Nhập email của bạn"
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
                                label="Nhập mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn chưa nhập mật khẩu",
                                    },
                                    {
                                        min: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                                    },
                                ]}
                            >
                                <Input
                                    type={passwordVisible ? "text" : "password"}
                                    className="oke"
                                    placeholder="Mật khẩu"
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

                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: "Bạn chưa nhập lại mật khẩu",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error("Mật khẩu nhập lại không khớp với mật khẩu trước đó")
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    type={confirmPasswordVisible ? "text" : "password"}
                                    className="oke"
                                    placeholder="Nhập lại mật khẩu"
                                    suffix={
                                        confirmPasswordVisible ? (
                                            <EyeTwoTone
                                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        ) : (
                                            <EyeInvisibleOutlined
                                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                                style={{ cursor: "pointer" }}
                                            />
                                        )
                                    }
                                />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Register;
