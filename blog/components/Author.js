import {Avatar, Divider} from "antd";
import {GithubOutlined, QqOutlined, WechatOutlined} from '@ant-design/icons';
import '../static/style/components/author.css'


const Author = () => {
    return (
        <div className='author-div comm-box'>
            <div><Avatar size={100} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599123506755&di=88c7698d60a94dc169b47983e7358bb8&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D752713895%2C562712055%26fm%3D214%26gp%3D0.jpg"/></div>
            <div className="author-introduction">
                光头程序员，专注于WEB和移动前端开发。要录1000集免费前端视频的傻X。此地维权无门，此时无能为力，此心随波逐流。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className='account'/>
                <Avatar size={28} icon={<QqOutlined />} className='account'/>
                <Avatar size={28} icon={<WechatOutlined />} className='account'/>
            </div>
        </div>
    )
};

export default Author;
