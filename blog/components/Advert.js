import React, {Fragment} from 'react';
import '../static/style/components/advert.css'


const Advert = () => {
    return (
        <Fragment>
            <div className='ad-div comm-box'>
                <div><img src="http://blogimages.jspang.com/flutter_ad2.jpg" width="100%"/></div>
                <div><img src="http://blogimages.jspang.com/Vue_koa_ad1.jpg" width="100%"/></div>
                <div><img src="http://blogimages.jspang.com/WechatIMG12.jpeg" width="100%"/></div>
                <div><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599123907615&di=50e95e69d72fb6093796928f11ef5cf1&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160414%2F824a271dbf4247cbb2329950230cbda8_th.jpg" width="100%"/></div>
            </div>
        </Fragment>
    )
};


export default Advert;
