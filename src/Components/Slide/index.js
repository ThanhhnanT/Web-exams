import { Carousel } from "antd";
import './slide.scss'
function Slide() {
    return (
        <>
            <Carousel arrows draggable={true} className="home__slide">
                <div className="home__slide--1">
                    <img src="https://blog.cleveracademy.vn/wp-content/uploads/2020/10/hoc-tieng-anh-ngay-bay-gio.jpg" alt="1" />
                    <h3>LUYỆN THI TIẾNG ANH HIỆU QUẢ</h3>
                </div>
                <div className="home__slide--2">
                    <img src="https://talkfirst.vn/wp-content/uploads/2024/06/1-khoa-hoc-tieng-anh-bao-nhieu-tien.jpg" alt="1" />
                    <h3>HÃY TRẢI NGHIỆM DỊCH VỤ CỦA CHÚNG TÔI</h3>
                </div>
                <div className="home__slide--3">
                    <img src="https://phienglish.com/wp-content/uploads/2023/07/Coral-and-Blue-Facebook-Event-Cover.png" alt="1" />
                    <h3>VÀ HỌC THEO CÁCH CỦA BẠN</h3>
                </div>


            </Carousel>

        </>
    )
}

export default Slide;