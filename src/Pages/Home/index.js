import { Carousel, Card, Tag, Rate, Row, Col, Button, Modal } from "antd";
import { useState, useEffect } from "react";
import { getTopic } from "../../Services/topic";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

function Home() {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null); // Lưu id của đề thi được chọn
    const navigate = useNavigate();

    // Hiển thị modal và lưu id của đề thi
    const showModal = (id) => {
        setSelectedId(id);
        setIsModalOpen(true);
    };

    // Xử lý khi người dùng xác nhận
    const handleOk = () => {
        if (selectedId) {
            navigate(`/quizz/${selectedId}`); // Chuyển đến trang thi với id
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedId(null);
    };

    useEffect(() => {
        const ttopic = async () => {
            const result = await getTopic();
            setData(result);
        };
        ttopic();
    }, []);

    return (
        <>
            <Carousel arrows draggable={true} className="home__slide">
                <div className="home__slide--1">
                    <img
                        src="https://blog.cleveracademy.vn/wp-content/uploads/2020/10/hoc-tieng-anh-ngay-bay-gio.jpg"
                        alt="1"
                    />
                    <h3>LUYỆN THI TIẾNG ANH HIỆU QUẢ</h3>
                </div>
                <div className="home__slide--2">
                    <img
                        src="https://talkfirst.vn/wp-content/uploads/2024/06/1-khoa-hoc-tieng-anh-bao-nhieu-tien.jpg"
                        alt="1"
                    />
                    <h3>HÃY TRẢI NGHIỆM DỊCH VỤ CỦA CHÚNG TÔI</h3>
                </div>
                <div className="home__slide--3">
                    <img
                        src="https://phienglish.com/wp-content/uploads/2023/07/Coral-and-Blue-Facebook-Event-Cover.png"
                        alt="1"
                    />
                    <h3>VÀ HỌC THEO CÁCH CỦA BẠN</h3>
                </div>
            </Carousel>
            <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                <Row gutter={[20, 20]}>
                    <Col span={8}>
                        <Card
                            hoverable
                            className="course-card"
                            cover={
                                <img
                                    alt="IELTS Reading"
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Stack_of_books.jpg"
                                />
                            }
                            style={{ marginTop: '20px', }}
                        >
                            <div className="course-card__header">
                                <h4>Luyện thi</h4>
                                <h3>
                                    <span className="highlight">IELTS</span> READING
                                </h3>
                                <Tag color="blue">General Training Lessons & Exercises</Tag>
                            </div>
                            <div className="course-card__content">
                                <p>[IELTS General Training] Intensive Reading: Từ Vựng - Chiến Lược Làm Bài - Chữa đề chi tiết</p>
                                <Row align="middle" className="course-card__rating">
                                    <Rate disabled defaultValue={5} />
                                    <span className="rating-count">(64)</span>
                                    <span className="student-count">698 Học viên</span>
                                </Row>
                                <Tag color="geekblue">#Phần mềm online</Tag>
                            </div>
                            <div className="course-card__footer">
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <span className="price-current">699.000đ</span>
                                        <span className="price-original">899.000đ</span>
                                    </Col>
                                    <Tag color="red">-22%</Tag>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            className="course-card"
                            cover={
                                <img
                                    alt="IELTS Reading"
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Stack_of_books.jpg"
                                />
                            }
                            style={{ marginTop: '20px', }}
                        >
                            <div className="course-card__header">
                                <h4>Luyện thi</h4>
                                <h3>
                                    <span className="highlight">IELTS</span> LISTENING
                                </h3>
                                <Tag color="blue">General Training Lessons & Exercises</Tag>
                            </div>
                            <div className="course-card__content">
                                <p>[IELTS General Training] Intensive Reading: Từ Vựng - Chiến Lược Làm Bài - Chữa đề chi tiết</p>
                                <Row align="middle" className="course-card__rating">
                                    <Rate disabled defaultValue={5} />
                                    <span className="rating-count">(64)</span>
                                    <span className="student-count">698 Học viên</span>
                                </Row>
                                <Tag color="geekblue">#Phần mềm online</Tag>
                            </div>
                            <div className="course-card__footer">
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <span className="price-current">699.000đ</span>
                                        <span className="price-original">899.000đ</span>
                                    </Col>
                                    <Tag color="red">-22%</Tag>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            hoverable
                            className="course-card"
                            cover={
                                <img
                                    alt="IELTS Reading"
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Stack_of_books.jpg"
                                />
                            }
                            style={{ marginTop: '20px', }}
                        >
                            <div className="course-card__header">
                                <h4>Luyện thi</h4>
                                <h3>
                                    <span className="highlight">IELTS</span> WRITTING
                                </h3>
                                <Tag color="blue">General Training Lessons & Exercises</Tag>
                            </div>
                            <div className="course-card__content">
                                <p>[IELTS General Training] Intensive Reading: Từ Vựng - Chiến Lược Làm Bài - Chữa đề chi tiết</p>
                                <Row align="middle" className="course-card__rating">
                                    <Rate disabled defaultValue={5} />
                                    <span className="rating-count">(64)</span>
                                    <span className="student-count">698 Học viên</span>
                                </Row>
                                <Tag color="geekblue">#Phần mềm online</Tag>
                            </div>
                            <div className="course-card__footer">
                                <Row justify="space-between" align="middle">
                                    <Col>
                                        <span className="price-current">699.000đ</span>
                                        <span className="price-original">899.000đ</span>
                                    </Col>
                                    <Tag color="red">-22%</Tag>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    <h2>Một số đề thi</h2>
                    {data.map((item) => (
                        <Col span={24} key={item.id}>
                            <Card
                                onClick={() => showModal(item.id)} // Truyền id của đề thi khi click
                                style={{ cursor: "pointer" }}
                                title={`Đề số: ${item.id}`}
                            >
                                <p>{item.topic}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Modal
                    title="Bạn chắc chắn muốn làm bài thi này?"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p>Đề thi số: {selectedId}</p>
                </Modal>
            </div>
        </>
    );
}

export default Home;


