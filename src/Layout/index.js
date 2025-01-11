import { Avatar, Layout, Menu, Button } from 'antd';
import { LoginOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import logoBk from "../Images/logoBk.jpg"
import './Layout.scss'
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { getCookie } from '../Helpers/cookies';
import Slide from '../Components/Slide';
// import Home from '../Pages/Home';

function LayoutDefault() {

    const { Header, Content, Footer } = Layout;
    const token = getCookie("token")
    // console.log(token)
    const navigate = useNavigate();
    const headerStyle = {
        textAlign: 'center',
        display: 'flex',
        padding: 0,
        justifyCotent: 'space-between'
    };
    const item = [
        {
            key: 1,
            label: "Home",
            onClick: () => navigate('/')
        },
    ]
    const items = [
        {
            key: 1,
            label: "Trang chủ",
            onClick: () => navigate('/')
        },
        {
            key: 2,
            label: "Luyện đề online",
            onClick: () => navigate('/topics')
        },
        {
            key: 3,
            label: "Thống kê",
            onClick: () => navigate("/answers")
        },
    ]

    return (
        <>
            <Layout>
                <Header style={headerStyle} className='header'>
                    <div className='header__logo'>
                        <img src={logoBk} alt='logo' />
                    </div>
                    {token ? (<Menu
                        theme='dark'
                        mode="horizontal"
                        items={items}
                    />) :
                        (<>
                            <Menu
                                theme='dark'
                                mode="horizontal"
                                items={item}
                            />
                        </>)}
                    <div className='header__login'>
                        {token ? (
                            <>
                                <Avatar size="large" icon={<UserOutlined />} />
                                <Link to="/logout">
                                    <Button className='button' type="primary" icon={<LoginOutlined />}>
                                        Đăng xuât
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button className='button' type="primary" icon={<LoginOutlined />} >
                                        Đăng nhập
                                    </Button>
                                </Link>
                                <Link to='/Register'>
                                    <Button className='button' type="default" icon={<UserAddOutlined />} >
                                        Đăng ký
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div >

                </Header >
                <Content>
                    <Outlet />
                </Content>
            </Layout >
        </>
    )
}

export default LayoutDefault;