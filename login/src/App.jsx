import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//导航
import Navigator from './pages/navigator'
//首页
import Home from './pages/home'
//注册
import Register from './pages/register'
//登录
import Login from './pages/login'
export default class App extends Component {
    render() {
        return (
            <Router>
                <Navigator />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Router>
        )
    }
}
