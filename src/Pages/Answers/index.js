import { Row, Col, Button } from "antd";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnswer } from "../../Services/answers";
import { getTopic } from "../../Services/topic";

function Answers() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const listQuestion = await getAnswer();
                const res = await getTopic();
                console.log(listQuestion, res)
                const finalResult = []
                if (res && listQuestion) {
                    for (let i = 0; i < listQuestion.length; i++) {
                        const topicItem = res.find(item => parseInt(item.id) === listQuestion[i].topicID);
                        finalResult.push({
                            ...listQuestion[i],
                            topic: topicItem ? topicItem.topic : null, // Chỉ thêm thuộc tính topic
                        });
                    }
                    setData(finalResult);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);
    data.reverse();
    console.log(data)
    const columns = [
        {
            title: "STT",
            key: "index",
            render: (_, __, index) => index + 1, // index + 1 để bắt đầu từ 1
        },
        {
            title: "Đề thi",
            dataIndex: "topic",
            key: "topic",
            width: "50%",
        },
        {
            title: "Thời gian làm bài",
            dataIndex: "time",
            key: "time",
            width: "15%",
        },
        {
            title: "Ngày làm bài",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "",
            key: "actions",
            width: "20%",
            render: (_, record) => (
                <Link to={`/results/${record.id}`}>
                    <Button type="primary">Xem chi tiết</Button>
                </Link>
            ),
        },
    ];
    
    return (
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <Row justify="center">
                <Col span={24}>
                    <h2>Thống kê bài làm</h2>
                    <Table rowKey="id" dataSource={data} columns={columns} />
                </Col>
            </Row>
        </div>
    );
}

export default Answers;
