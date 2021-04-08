import React, {useState} from 'react';
import Head from "next/head";
import {Row, Col, List, Affix, Breadcrumb} from 'antd';
import {FieldTimeOutlined, AlignLeftOutlined, FieldNumberOutlined} from '@ant-design/icons';
import Header from "../components/Header";      // 头部模块
import Author from "../components/Author";      // 坐着模块
import Advert from "../components/Advert";      // 广告模块
import Footer from "../components/Footer";      // 脚部模块
import MarkNav from 'markdown-navbar';          // 目录模块
import 'markdown-navbar/dist/navbar.css';
import '../static/style/pages/index.css';
import Link from "next/link";
import axios from 'axios';
import servicePath from "../config/apiUrl";
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const Home = (list) => {
    console.log(list)
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });


    // 首页列表数据
    const [mylist, setMylist] = useState(list.data);

    // 文章目录导航数据
    const markdown = '## 1.科比布莱恩特\n' +
        '\n## 2. 勒布朗詹姆斯\n' +
        '\n## 3. 迈克尔乔丹\n' +
        '\n## 4. 斯蒂芬库里\n' +
        '\n## 5. 凯文杜兰特\n' +
        '\n## 6. 德怀恩韦德\n' +
        '\n## 7. 姚明\n';
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>
            <Header/>
            <Row className='comm-main' type='flex' justify='center'>
                <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <List
                            header={<div>最新日志</div>}
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
                                        <span><FieldTimeOutlined/>：{item.addTime}</span>
                                        <span><AlignLeftOutlined/>：{item.typeName}</span>
                                        <span><FieldNumberOutlined/>：{item.view_count}</span>
                                    </div>
                                    <div className="list-context"
                                         dangerouslySetInnerHTML={{__html: marked(item.article_content)}}></div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>
                <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
                    {/*作者信息*/}
                    <Author/>
                    {/*广告信息*/}
                    <Advert/>
                    {/*目录信息*/}
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <MarkNav
                                className="article-menu"
                                source={markdown}
                                ordered={false}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
};

Home.getInitialProps = async () => {
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleList).then(
            (res) => {
                // console.log('远程获取数据结果:', res.data.data);
                resolve(res.data);
            }
        )
    });
    return await promise;
};

export default Home;
