import { Row, Col, Button } from 'antd'
import { Table, Tag, Tooltip } from "antd";
import { getTopic } from '../../Services/topic';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Topic() {
    const [data, setData] = useState([])

    useEffect(() => {
        const ttopic = async () => {
            const result = await getTopic();
            setData(result)
        }
        ttopic();
    }, [])

    const columns = [
        {
            title: "STT",
            dataIndex: "id",
            name: "id",
        },
        {
            title: "Đề thi",
            dataIndex: "topic",
            name: "topic",
            width: "70%",
        },
        {
            title: "",
            dataIndex: "",
            name: "",
            width: "20%",
            render: (_, record) => {
                return (
                    <>
                        <Link to={"/quizz/" + record.id}>
                            <Button type='primary'>
                                Làm bài
                            </Button>
                        </Link>
                    </>
                )
            }
        }
    ]


    return (
        <>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Row justify="center">
                    <Col span={24}>
                        <h2>Danh sách đề thi</h2>
                        <Table rowKey="id" dataSource={data} columns={columns} />
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default Topic;