/**
 * 登录模块
 * */
import React, {useState, Fragment, useEffect, createContext} from "react";
import 'antd/dist/antd.css';
import {Card, Input, Button, Spin, message} from "antd";
import {UserOutlined, AndroidOutlined} from '@ant-design/icons';
import {useHistory} from "react-router-dom";        //路由跳转
import '../static/css/Login.css';
import axios from 'axios';
import servicePath from "../config/apiUrl";

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {

    }, []);

    const checkLogin = () => {
        setIsLoading(true);
        if (!userName) {
            message.error('用户名不能为空！');
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return false;
        } else if (!password) {
            message.error('密码不能为空！');
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
            return false;
        }
        let dataProps = {
            userName: userName,
            password: password
        };
        axios({
            method: 'post',
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true   // 前端后端共享session
        }).then(
            res => {
                console.log(res.data);
                setIsLoading(false);
                if (res.data.code === 1000) {
                    window.localStorage.setItem('openId', res.data.openId);
                    props.history.push('/index');
                } else {
                    message.error('用户名密码错误');
                }
            }
        );
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    };

    return (
        <Fragment>
            <div className='login-div'>
                <Spin tip='Loading...' spinning={isLoading}>
                    <Card title='博客后台管理' bordered={true} style={{width: 400}}>
                        <Input
                            id='userName'
                            size='large'
                            placeholder='请输入用户名'
                            prefix={<UserOutlined style={{color: '#cecece'}}/>}
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                        />
                        <br/><br/>
                        <Input.Password
                            id='passWord'
                            size='large'
                            placeholder='请输入密码'
                            prefix={<AndroidOutlined style={{color: '#cecece'}}/>}
                            onChange={(e) => {
                                setPassWord(e.target.value)
                            }}
                        />
                        <br/><br/>
                        <Button type='primary' size='large' block onClick={checkLogin}>Login in</Button>
                    </Card>
                </Spin>
            </div>
        </Fragment>
    )
}

export default Login
