/**
 * 配置路由模块
 * */
import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login'
import AdminIndex from './AdminIndex'

function Main() {
    return (
        <Router>
            {/*exact精确匹配路由*/}
            <Route path='/' exact component={Login}/>
            <Route path='/index/' component={AdminIndex}/>
        </Router>
    )
}

export default Main
