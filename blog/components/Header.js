import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {Row, Col, Menu} from 'antd';
import axios from 'axios';
import {HomeOutlined, VideoCameraOutlined, SmileOutlined} from '@ant-design/icons';
import servicePath from '../config/apiUrl';
import '../static/style/components/header.css';

const Header = () => {
    const [navArray, setNavArray] = useState([]);

    // 除了Header组件函数之外，其他的都是副效应函数，useEffect就是一个特殊的副效应函数，只会执行一次
    /**
     * 副效应函数useEffect()的常见用途
     * 1、获取数据 （data fetching）
     * 2、事件监听活订阅（setting up a subscription）
     * 3、改变DOM（changing the DOM）
     * 4、输出日志（logging）
     * */
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    console.log(res);
                    setNavArray(res.data.data);
                    return res.data.data
                }
            );
            setNavArray(result)
        };
        fetchData();
    }, []);

    //跳转到列表页
    const handleClick = (e) => {
        console.log(e);
        if (e.key == 0) {
            Router.push({pathname: '/'});
        } else {
            Router.push({pathname: '/list', query: {id: e.key}});
        }
    };

    return (
        <div className='header'>
            <Row type='flex' justify='center'>
                <Col xs={24} sm={24} md={18} lg={15} xl={12}>
                    <span className='header-logo'>
                        <Link href={{pathname: '/'}}>
                            <a>科比布莱恩特</a>
                        </Link>
                    </span>
                    <span className='header-txt'>——我现在所做的一切,都是为了追求更加完美。</span>
                </Col>
                <Col className='menu-div' xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu
                        mode='horizontal'
                        onClick={handleClick}
                    >
                        <Menu.Item key='0'>
                            <HomeOutlined/>
                            博客首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
};

export default Header;
