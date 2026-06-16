import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <section className="home-page" aria-labelledby="home-title">
                <div className="home-content">
                    <span className="eyebrow">智能简历工作台</span>
                    <h1 id="home-title">从账号开始，进入你的简历管理空间</h1>
                    <p>登录后继续编辑资料、维护作品经历，并把关键求职信息集中管理在一个清晰的界面里。</p>
                    <div className="home-actions">
                        <Link className="primary-action home-action" to="/login">登录账号</Link>
                        <Link className="secondary-action home-action" to="/register">创建账号</Link>
                    </div>
                </div>
                <div className="home-preview" aria-hidden="true">
                    <div className="preview-window">
                        <div className="preview-header">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="preview-body">
                            <span className="preview-line strong"></span>
                            <span className="preview-line"></span>
                            <span className="preview-line short"></span>
                            <div className="preview-panel">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
