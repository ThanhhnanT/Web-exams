import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { questionList } from '../../Services/question';
import { get1Topic } from '../../Services/topic';
import { Row, Col, Card, Radio, Space, Form, Button } from 'antd';
import useMessage from 'antd/es/message/useMessage';
import { getCookie } from '../../Helpers/cookies';
import { postResult } from '../../Services/postResult';
import { useNavigate } from 'react-router-dom';

function Quizz() {
    const [messageAPI, contextHolder] = useMessage();
    const [list, setList] = useState([]);
    const [topicss, setTopic] = useState([]);
    const [unansweredQuestions, setUnansweredQuestions] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // State để lưu các câu hỏi đã điền
    const param = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const currentDate = new Date(); // Lấy thời gian hiện tại
        const year = currentDate.getFullYear(); // Năm
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng (thêm '0' nếu cần)
        const day = String(currentDate.getDate()).padStart(2, '0'); // Ngày (thêm '0' nếu cần)
        const hours = String(currentDate.getHours()).padStart(2, '0'); // Giờ (thêm '0' nếu cần)
        const minutes = String(currentDate.getMinutes()).padStart(2, '0'); // Phút (thêm '0' nếu cần)
        const seconds = String(currentDate.getSeconds()).padStart(2, '0'); // Giây (thêm '0' nếu cần)

        const formattedDate = `${day}-${month}-${year}`; // Định dạng ngày tháng năm
        const formattedTime = `${hours}:${minutes}:${seconds}`; // Định dạng giờ phút giây

        const result = Object.keys(values).map((key) => {
            return {
                questionID: key,
                answer: values[key],
            };
        });

        setUnansweredQuestions([]);
        let options = {
            userID: getCookie("id"),
            topicID: parseInt(param.id),
            date: formattedDate, // Thêm ngày tháng năm
            time: formattedTime, // Thêm giờ phút giây
            result,
        };
        const submitAnswer = await postResult(options);
        if (submitAnswer) {
            await messageAPI.loading({
                content: "Đang chấm điểm ...",
                duration: 3, // Thời gian hiển thị (giây)
                style: {
                    fontSize: '16px', // Tăng kích thước chữ
                },
            });
            navigate(`/results/${submitAnswer.id}`);
        }
    };

    const handleSubmitFailed = async (errorInfo) => {
        console.log("Form submission failed:", errorInfo);
        await messageAPI.loading({
            content: "Đang chấm điểm ...",
            duration: 3, // Thời gian hiển thị (giây)
            style: {
                fontSize: '16px', // Tăng kích thước chữ
            },
        });
        messageAPI.error({
            content: "Còn câu hỏi bạn chưa trả lời!!",
            duration: 3, // Thời gian hiển thị (giây)
            style: {
                fontSize: '16px', // Tăng kích thước chữ
            },
        });
        const unanswered = errorInfo.errorFields.map((field) => field.name[0]);
        setUnansweredQuestions(unanswered);
        window.scrollTo({ top: 0 });
    };

    const handleAnswerChange = (questionId) => {
        // Thêm câu hỏi vào danh sách đã điền nếu chưa có
        if (!answeredQuestions.includes(questionId)) {
            setAnsweredQuestions([...answeredQuestions, questionId]);
        }
    };

    useEffect(() => {
        const getTopic = async () => {
            const set = await get1Topic(param.id);
            setTopic(set);
        };
        getTopic();
        const object = async () => {
            const data = await questionList(param.id);
            setList(data);
        };
        object();
    }, [param.id]);

    return (
        <>
            {contextHolder}
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <h2>{topicss && topicss[0]?.topic ? topicss[0].topic : "Loading topic..."}</h2>
                        <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
                            {list.map((item, index) => (
                                <div key={item.id}>
                                    <Form.Item
                                        name={item.id}
                                        rules={[
                                            {
                                                required: true,
                                                // message: "Bạn chưa chọn đáp án câu này",
                                            },
                                        ]}
                                    >
                                        <Card
                                            title={item.title}
                                            headStyle={{
                                                backgroundColor: answeredQuestions.includes(item.id)
                                                    ? "#e6f7ff" // Màu xanh da trời nhạt cho câu hỏi đã điền
                                                    : unansweredQuestions.includes(item.id)
                                                        ? "#ffcccc" // Màu đỏ nhạt cho câu hỏi chưa điền
                                                        : "inherit", // Màu mặc định
                                                color: answeredQuestions.includes(item.id)
                                                    ? "#1890ff"
                                                    : unansweredQuestions.includes(item.id)
                                                        ? "red"
                                                        : "inherit",
                                            }}
                                            style={{
                                                marginTop: "20px",
                                            }}
                                        >
                                            <p style={{
                                                marginTop: "0", color: answeredQuestions.includes(item.id)
                                                    ? "#1890ff"
                                                    : unansweredQuestions.includes(item.id)
                                                        ? "red"
                                                        : "inherit",
                                            }}>
                                                <strong>Câu {index + 1}</strong>: {item.question}
                                            </p>
                                            <Radio.Group onChange={() => handleAnswerChange(item.id)}>
                                                <Space direction="vertical">
                                                    {item.answers.map((itemANS, indexANS) => (
                                                        <Radio
                                                            style={{
                                                                color: answeredQuestions.includes(item.id)
                                                                    ? "#1890ff" // Chữ màu đỏ cho câu hỏi chưa điền
                                                                    : unansweredQuestions.includes(item.id)
                                                                        ? "red" // Chữ màu xanh da trời cho câu hỏi đã điền
                                                                        : "inherit", // Màu mặc định
                                                            }}
                                                            key={indexANS}
                                                            value={indexANS + 1}
                                                        >
                                                            {itemANS}
                                                        </Radio>
                                                    ))}
                                                </Space>
                                            </Radio.Group>
                                        </Card>
                                    </Form.Item>
                                </div>
                            ))}
                            <Button type="primary" htmlType="submit">
                                Nộp bài
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Quizz;