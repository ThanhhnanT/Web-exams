import { Row, Col, message, Form, Input, Button, InputNumber, Switch } from "antd"
import { register, checkEmail } from "../../Services/Login";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../Helpers/tokens";

function Register() {
    const [form] = Form.useForm()
    const [messageAPI, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        const haveEmail = await checkEmail(e.email)
        if (haveEmail.length > 0) {
            messageAPI.error("Email đã tồn tại! Vui lòng chọn email khác")
        }
        else {
            const str = generateToken();
            const object = {
                fullName: e.fullName,
                email: e.email,
                password: e.password,
                token: str
            }
            const result = await register(object);
            if(result){
                await messageAPI.loading("Đang tạo tài khoản ...")
                navigate("/login")
            }
            else{
                messageAPI.error("Tạo tài khoản bị lỗi! Vui lòng kiểm tra kết nối mạng")
            }
        }
    }

    return (
        <>
            {contextHolder}
            <div className='login'>
                <Row gutter={[20, 20]}>
                    <Col span={8} offset={8}>
                        <h3>ĐĂNG KÝ TÀI KHOẢN</h3>
                        <Form layout="vertical" form={form} name="Login" onFinish={handleSubmit}>
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
                                <Input className="oke" placeholder="name@gmail.com" />
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
                                    }
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
                                        message: "Bạn chưa nhập password",
                                    },
                                    {
                                        min: 6,
                                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                                    },
                                ]}
                            >
                                <Input className="oke" placeholder="password" />
                            </Form.Item>

                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                dependencies={['password']} // Đảm bảo theo dõi thay đổi từ trường "password"
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
                                <Input className="oke" placeholder="password" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                    Đăng ký
                                </Button>
                            </Form.Item>
                        </Form>

                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Register;