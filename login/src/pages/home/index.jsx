import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <section className="home-page" aria-labelledby="home-title">
                <div className="home-ambient" aria-hidden="true"></div>
                <div className="home-shell">
                    <div className="home-content">
                        <span className="home-kicker">AresuMei Interview Studio</span>
                        <h1 id="home-title">把一份简历，变成一次有准备的面试。</h1>
                        <p>
                            上传简历，补充目标公司信息。AresuMei 会生成贴合岗位的面试问题，并指出简历里需要重写、补强和突出的位置。
                        </p>
                        <div className="home-actions">
                            <Link className="primary-action home-action" to="/resume-upload">开始生成面试</Link>
                            <Link className="secondary-action home-action" to="/login">登录账号</Link>
                        </div>
                        <div className="home-proof" aria-label="核心能力">
                            <span>面试问题生成</span>
                            <span>公司信息匹配</span>
                            <span>简历重写建议</span>
                        </div>
                    </div>
                    <div className="home-preview" aria-hidden="true">
                        <div className="preview-orbit">
                            <div className="preview-card resume-card">
                                <div className="preview-tag">Resume</div>
                                <strong>前端工程师 · 3 年</strong>
                                <span></span>
                                <span className="medium"></span>
                                <span className="short"></span>
                            </div>
                            <div className="preview-card company-card">
                                <div className="preview-tag">Company</div>
                                <strong>AI SaaS · B 轮</strong>
                                <span></span>
                                <span className="short"></span>
                            </div>
                            <div className="preview-card output-card">
                                <div className="preview-tag">Ready</div>
                                <strong>12 个追问 · 4 处简历优化</strong>
                                <div className="output-row">
                                    <i></i>
                                    <span>项目难点与业务结果</span>
                                </div>
                                <div className="output-row">
                                    <i></i>
                                    <span>岗位关键词补强</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="success-section" aria-labelledby="success-title">
                    <div className="success-heading">
                        <span className="home-kicker">Success examples</span>
                        <h2 id="success-title">他们用 AresuMei，把准备时间花在真正会被追问的地方。</h2>
                    </div>
                    <div className="success-grid">
                        <article className="success-card featured">
                            <div className="success-meta">
                                <span>前端工程师</span>
                                <strong>从项目描述薄弱，到拿下二面</strong>
                            </div>
                            <p>
                                用户上传简历后，AresuMei 根据目标公司的低代码业务，生成了项目架构、性能优化和协作复盘问题，并提示把“负责页面开发”重写成可量化的业务结果。
                            </p>
                            <div className="success-result">
                                <strong>2 天</strong>
                                <span>完成简历重写与面试追问演练</span>
                            </div>
                        </article>
                        <article className="success-card">
                            <div className="success-meta">
                                <span>应届产品经理</span>
                                <strong>把校园项目改成岗位语言</strong>
                            </div>
                            <p>
                                公司信息补充后，系统把案例拆成用户洞察、指标定义、取舍理由三类问题，并建议突出调研样本和转化数据。
                            </p>
                            <div className="success-result">
                                <strong>8 个</strong>
                                <span>高频追问提前准备</span>
                            </div>
                        </article>
                        <article className="success-card">
                            <div className="success-meta">
                                <span>Java 后端开发</span>
                                <strong>提前补齐系统设计短板</strong>
                            </div>
                            <p>
                                针对招聘 JD 里的高并发关键词，AresuMei 标出了简历缺少的压测、缓存和降级信息，并生成了一组系统设计追问。
                            </p>
                            <div className="success-result">
                                <strong>4 处</strong>
                                <span>简历经历被重新强化</span>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="resume-upgrade-section" aria-label="简历优化前后视觉案例">
                    <div className="resume-upgrade-heading">
                        <span className="home-kicker">Resume upgrade</span>
                        <h2>根据公司信息和你的简历，生成更容易收到面试的简历。</h2>
                    </div>
                    <div className="resume-upgrade-grid">
                        <article className="resume-upgrade-card" aria-label="简历优化案例一">
                            <div className="resume-sheet before-sheet">
                                <span className="sheet-avatar"></span>
                                <strong className="sheet-title">技能描述</strong>
                                <p className="sheet-copy">熟悉计算机网络</p>
                                <p className="sheet-copy muted">了解 TCP/IP、HTTP 基础</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy">做过后台管理系统</p>
                                <p className="sheet-copy muted">参与接口联调</p>
                            </div>
                            <span className="upgrade-arrow" aria-hidden="true"></span>
                            <div className="resume-sheet after-sheet">
                                <span className="sheet-avatar"></span>
                                <strong className="sheet-title">岗位匹配</strong>
                                <p className="sheet-copy highlight-copy">熟悉 I/O 多路复用与 TCP 连接优化</p>
                                <p className="sheet-copy muted">定位并降低接口超时率</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy highlight-copy">负责权限系统核心模块</p>
                                <p className="sheet-copy muted">支撑 3 类角色流程闭环</p>
                            </div>
                        </article>
                        <article className="resume-upgrade-card raised" aria-label="简历优化案例二">
                            <div className="resume-sheet before-sheet compact">
                                <strong className="sheet-title">项目经历</strong>
                                <p className="sheet-copy">负责页面开发</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">使用 React 完成功能</p>
                                <p className="sheet-copy">优化加载速度</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">配合后端上线</p>
                            </div>
                            <span className="upgrade-arrow" aria-hidden="true"></span>
                            <div className="resume-sheet after-sheet compact">
                                <strong className="sheet-title">业务结果</strong>
                                <span className="sheet-score"></span>
                                <p className="sheet-copy highlight-copy">重构首屏渲染链路</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">LCP 从 3.8s 降至 1.9s</p>
                                <p className="sheet-copy highlight-copy">沉淀组件规范</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">减少 30% 重复开发</p>
                            </div>
                        </article>
                        <article className="resume-upgrade-card" aria-label="简历优化案例三">
                            <div className="resume-sheet before-sheet">
                                <span className="sheet-avatar"></span>
                                <strong className="sheet-title">个人优势</strong>
                                <p className="sheet-copy">学习能力强</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">熟悉数据库</p>
                                <p className="sheet-copy">写过 SQL</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">了解缓存</p>
                            </div>
                            <span className="upgrade-arrow" aria-hidden="true"></span>
                            <div className="resume-sheet after-sheet">
                                <span className="sheet-avatar"></span>
                                <strong className="sheet-title">技术亮点</strong>
                                <span className="sheet-score"></span>
                                <p className="sheet-copy highlight-copy">设计 MySQL 索引优化方案</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">慢查询耗时下降 62%</p>
                                <p className="sheet-copy highlight-copy">引入 Redis 缓存策略</p>
                                <span className="sheet-divider"></span>
                                <p className="sheet-copy muted">热点接口 QPS 提升</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        )
    }
}
