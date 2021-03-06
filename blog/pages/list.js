import React, {useState, useEffect, Fragment} from 'react'
import Head from 'next/head'
import {Row, Col, List, Breadcrumb} from 'antd'
// 引入字体图标
import {FieldTimeOutlined, AlignLeftOutlined, FieldNumberOutlined} from '@ant-design/icons'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/list.css'
import Link from 'next/link'
import axios from 'axios';
import servicePath from "../config/apiUrl";


const MyList = (list) => {
    console.log(list);
    const [mylist, setMylist] = useState(list.data);

    useEffect(() => {
        setMylist(list.data);
    });

    return (
        <Fragment>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <List
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{pathname: '/detailed', query: {id: item.id}}}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><FieldTimeOutlined/> {item.addTime}</span>
                                        <span><AlignLeftOutlined/> {item.typeName}</span>
                                        <span><FieldNumberOutlined/> {item.view_count}人</span>
                                    </div>
                                    <div className="list-context">{item.introduce}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                </Col>
            </Row>
            <Footer/>
        </Fragment>
    )
};

MyList.getInitialProps = async (content) => {
    let id = content.query.id;
    const promise = new Promise((resolve) => {
        axios(servicePath.getListById + id).then(res => {
            resolve(res.data);
        })
    });
    return await promise;
};

export default MyList
