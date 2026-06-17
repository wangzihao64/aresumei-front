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
//简历上传
import ResumeUpload from './pages/resumeUpload'
export default class App extends Component {
    render() {
        return (
            <Router>
                <a className="skip-link" href="#main-content">跳到主要内容</a>
                <Navigator />
                <main id="main-content" className="app-main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/resume-upload" element={<ResumeUpload />} />
                    </Routes>
                </main>
            </Router>
        )
    }
}
