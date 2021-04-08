import React, {useEffect, useState} from "react";
import marked from 'marked'
import '../static/css/AddArticle.css'
import {Row, Col, Input, Select, Button, DatePicker, message} from "antd";
import axios from 'axios'
import servicePath from '../config/apiUrl';

const {Option} = Select;
const {TextArea} = Input;

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0);  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('');   //文章标题
    const [articleContent, setArticleContent] = useState('');  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容'); //html内容
    const [introducemd, setIntroducemd] = useState();   //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑'); //简介的html内容
    const [showDate, setShowDate] = useState();   //发布日期
    const [updateDate, setUpdateDate] = useState(); //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型'); //选择的文章类别

    /**
     * 第二个参数为空数组，代表useEffect只执行一次
     * */
    useEffect(() => {
        getTypeInfo();
        // 获取文章的ID
        console.log(props);
        let tmpId = props.match.params.id;
        if (tmpId) {
            setArticleId(tmpId);
            getArticleById(tmpId);
        }
    }, []);

    // 设置marked
    marked.setOptions({
        renderer: marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    });

    // 改变文章内容
    const changeContent = (e) => {
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html)
    };

    // 改变文章简介
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value);
        let html = marked(e.target.value);
        setIntroducehtml(html)
    };

    // 从中台得到文章类别下拉信息
    const getTypeInfo = () => {
        axios({
            method: 'get',
            url: servicePath.getTypeInfo,
            header: {'Access-Control-Allow-Origin': '*'},
            withCredentials: true   //  跨域检验Cookie
        }).then(res => {
            if (res.data.code !== 1000) {
                window.localStorage.removeItem('openId');
                props.history.push('/');
            } else {
                setTypeInfo(res.data.data);
            }
        })
    };

    // 选择类别后的变化
    const selectTypeHandler = (value) => {
        setSelectType(value);
    };

    // 保存文章的时候获取所有内容
    const saveArticle = () => {
        if (!selectedType) {
            message.error('必须选择文章类型');
            return false;
        } else if (selectedType === '请选择类型') {
            message.error('必须选择文章类型');
            return false;
        } else if (!articleTitle) {
            message.error('文章标题不能为空');
            return false;
        } else if (!articleContent) {
            message.error('文章内容不能为空');
            return false;
        } else if (!introducemd) {
            message.error('文章简介不能为空');
            return false;
        } else if (!showDate) {
            message.error('发布日期不能为空');
            return false;
        }
        let dataProps = {};
        dataProps.type_id = selectedType;
        dataProps.title = articleTitle;
        dataProps.article_content = articleContent;
        dataProps.introduce = introducemd;
        dataProps.addTime = (new Date(showDate.replace('-', '/')).getTime()) / 1000;
        if (articleId == 0) {   //  添加文章
            dataProps.view_count = 0;
            axios({
                method: 'post',
                url: servicePath.addArticle,
                data: dataProps,
                withCredentials: true
            }).then(res => {
                console.log(res);
                setArticleId(res.data.insertId);
                if (res.data.isSuccess) {
                    message.success('文章添加成功')
                } else {
                    message.error('文章添加失败')
                }
            })
        } else {    //  修改文章
            dataProps.id = articleId;
            axios({
                method: 'post',
                url: servicePath.updateArticle,
                data: dataProps,
                withCredentials: true   //  支持远程Cookie的访问
            }).then(res => {
                if (res.data.isSuccess) {
                    message.success('文章修改成功')
                } else {
                    message.error('文章修改失败')
                }
            })
        }
    };

    const getArticleById = (id) => {
        axios(servicePath.getArticleById + id, {withCredentials: true})
            .then(res => {
                console.log(res);
                if (res.data.code === 1000) {
                    let articleInfo = res.data.data[0];
                    setArticleTitle(articleInfo.title);
                    setArticleContent(articleInfo.article_content);
                    let html = marked(articleInfo.article_content);
                    setMarkdownContent(html);
                    setIntroducemd(articleInfo.introduce);
                    let tmpInt = marked(articleInfo.introduce);
                    setIntroducehtml(tmpInt);
                    setShowDate(articleInfo.addTime);
                    setSelectType(articleInfo.type_id);
                } else {
                    message.error(res.data.message);
                }
            })
    };

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={18}>
                            <Input
                                value={articleTitle}
                                onChange={e => {
                                    setArticleTitle(e.target.value)
                                }}
                                placeholder="博客标题"
                                size="middle"/>
                        </Col>
                        <Col span={6}>
                            &nbsp;
                            <Select defaultValue={selectedType}
                                    size="middle"
                                    onChange={selectTypeHandler}>
                                {
                                    typeInfo.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.Id}>
                                                {item.typeName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                className="markdown-content"
                                rows={27}
                                placeholder="文章内容"
                                onChange={changeContent}
                                onPressEnter={changeContent}
                                value={articleContent}
                            />
                        </Col>
                        <Col span={12}>
                            <div className="show-html"
                                 dangerouslySetInnerHTML={{__html: markdownContent}}>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="middle">暂存文章</Button>&nbsp;
                            <Button type="primary" size="middle" onClick={saveArticle}>发布文章</Button>
                            <br/>
                        </Col>
                    </Row>
                    <Col span={24}>
                        <br/>
                        <TextArea
                            rows={4}
                            placeholder="文章简介"
                            onChange={changeIntroduce}
                            value={introducemd}
                        />
                        <br/><br/>
                        <div className="introduce-html"
                             dangerouslySetInnerHTML={{__html: introducehtml}}>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="date-select">
                            <DatePicker
                                className="date-picker"
                                onChange={(date, dateString) => setShowDate(dateString)}
                                placeholder='发布日期'
                                size='middle'
                                value={showDate}
                            />
                        </div>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default AddArticle;
