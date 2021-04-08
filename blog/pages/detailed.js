import React, {Fragment} from 'react'
import Head from 'next/head'
import {Row, Col, Affix, Breadcrumb} from 'antd'
import {FieldTimeOutlined, AlignLeftOutlined, FieldNumberOutlined} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../static/style/pages/detailed.css'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from "../config/apiUrl";

const Detailed = (props) => {
    console.log(props);
    let articleContent = props.article_content;
    const tocify = new Tocify();
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions({
        renderer: renderer,     //渲染出自定义的格式
        gfm: true,              //启动类似Github样式的Markdown，true或者false
        pedantic: false,        //只解析符合Markdown定义的，不修整Markdown的错误
        sanitize: false,        //原始输出，忽略HTML标签，写false
        tables: true,           //支持Github形式的表格，必须打开gfm选项
        breaks: false,          //支持Github换行符
        smartLists: true,       //优化列表输出
        smartypants: false,     //高亮显示规则
        highlight: function (code) {        //高亮显示规则 ，这里我们将使用highlight.js来完成
            return hljs.highlightAuto(code).value;
        }
    });
    let html = marked(articleContent);
    return (
        <Fragment>
            <Head>
                <title>博客详细页</title>
            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className="bread-div">
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                                <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                        <div>
                            <div className="detailed-title">
                                {props.title}
                            </div>
                            <div className="list-icon center">
                                <span><FieldTimeOutlined/> {props.addTime}</span>
                                <span><AlignLeftOutlined/> {props.typeName}</span>
                                <span><FieldNumberOutlined/> {props.view_count}</span>
                            </div>
                            <div className="detailed-content"
                                 dangerouslySetInnerHTML={{__html: html}}>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Advert/>
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.render()}
                            </div>
                        </div>
                    </Affix>
                </Col>
            </Row>
            <Footer/>
        </Fragment>
    )
};

Detailed.getInitialProps = async (context) => {
    let id = context.query.id;
    const promise = new Promise((resolve) => {
        axios(servicePath.getArticleById + id).then(
            (res) => {
                resolve(res.data.data[0])
            }
        )
    });
    return await promise
};

export default Detailed
