import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getResult } from "../../Services/postResult";
import { questionList } from "../../Services/question";
import { Row, Col, Card, Radio, Space, Badge, Button } from 'antd';
import './result.scss';
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Pie } from '@ant-design/plots';

function Result() {
    const params = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [countTrue, setCountTrue] = useState(0);
    const [countFalse, setCountFalse] = useState(0);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getResult(params.id);
            const listQuestion = await questionList(res[0].topicID);
            const finalResult = [];

            if (res !== undefined && listQuestion !== undefined) {
                for (let i = 0; i < listQuestion.length; i++) {
                    finalResult.push({
                        ...listQuestion[i],
                        ...res[0].result.find(item => item.questionID === listQuestion[i].id),
                    });
                }
            }

            setResult(finalResult);

            // Đếm số câu đúng và sai
            let trueCount = 0, falseCount = 0;
            for (let i = 0; i < finalResult.length; i++) {
                if (parseInt(finalResult[i].answer) === finalResult[i].correctAnswer) trueCount++;
                else falseCount++;
            }
            setCountTrue(trueCount);
            setCountFalse(falseCount);

            // Cập nhật dữ liệu cho biểu đồ tròn
            const pieDatas = [
                { type: 'Câu đúng', value: trueCount },
                { type: 'Câu sai', value: falseCount },
            ];
            setPieData(pieDatas);
        };

        fetchData();
    }, [params.id]);

    // console.log(result)

    return (
        <>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>

                <h1>Kết quả bài thi</h1>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card title="Tổng quan kết quả">
                            <Space size="large">
                                <Badge
                                    count={<CheckOutlined style={{ color: '#52c41a', marginBottom: "10px" }} />}
                                    text={<span style={{ fontSize: '16px' }}>Câu đúng: {countTrue}</span>}
                                />
                                <Badge
                                    count={<CloseOutlined style={{ color: '#ff4d4f', marginBottom: "10px" }} />}
                                    text={<span style={{ fontSize: '16px', marginTop: "5px" }}>Câu sai: {countFalse}</span>}
                                />
                            </Space>
                            <Pie
                                data={pieData}
                                angleField="value"
                                colorField="type"
                                radius={0.8}
                                color={[
                                    '#52c41a', // Màu xanh lá cây cho "Câu đúng"
                                    'red',     // Màu đỏ cho "Câu sai"
                                ]}
                                label={{
                                    text: "value",
                                    content: '{value}',
                                    style: {
                                        fill: '#fff', // Màu chữ
                                        fontWeight: 'bold',
                                        fontSize: '30px'
                                    },
                                }}
                                interactions={[{ type: 'element-active' }]}
                                legend={{
                                    position: 'bottom',
                                    itemName: {
                                        style: {
                                            fill: '#000',
                                            fontWeight: 'bold',
                                        },
                                    },
                                }}
                            />

                        </Card>
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        {result.map((item, index) => (
                            <div key={item.id}>
                                <Badge.Ribbon
                                    text={parseInt(item.answer) === item.correctAnswer ? <CheckOutlined /> : <CloseOutlined />}
                                    color={parseInt(item.answer) === item.correctAnswer ? "green" : "red"}
                                >
                                    <Card
                                        title={item.title}
                                        headStyle={{
                                            backgroundColor: parseInt(item.answer) === item.correctAnswer
                                                ? "#f6ffed" // Màu xanh lá cây nhạt cho câu trả lời đúng
                                                : "#fff1f0", // Màu đỏ nhạt cho câu trả lời sai
                                            color: parseInt(item.answer) === item.correctAnswer
                                                ? "#52c41a" // Màu xanh lá cây đậm
                                                : "red", // Màu đỏ
                                        }}
                                        style={{
                                            marginTop: "20px",
                                        }}
                                    >
                                        <p style={{
                                            marginTop: "0",
                                            color: parseInt(item.answer) === item.correctAnswer
                                                ? "#52c41a" // Màu xanh lá cây đậm
                                                : "red", // Màu đỏ
                                        }}>
                                            <strong>Câu {index + 1}</strong>: {item.question}
                                        </p>
                                        <Radio.Group value={parseInt(item.answer)} disabled>
                                            <Space direction="vertical">
                                                {item.answers.map((itemANS, indexANS) => (
                                                    <Radio
                                                        style={{
                                                            color: parseInt(item.answer) === item.correctAnswer
                                                                ? "#52c41a" // Màu xanh lá cây đậm
                                                                : "red", // Màu đỏ
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
                                </Badge.Ribbon>
                            </div>
                        ))}
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Result;