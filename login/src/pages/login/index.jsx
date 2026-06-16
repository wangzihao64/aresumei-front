import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { actionCreators as loginActionCreators } from './store';

class Login extends Component {
    state = {
        userInfo: {
            username: '',
            password: '',
        },
        errMsg: {
            username: '',
            password: '',
            general: '',
        },
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ errMsg: { username: '', password: '', general: '' } });
        try {
            const { data } = await this.props.loginFn.loginAc(this.state.userInfo);
            if (data.status === 200) {
                window.alert('登录成功');
                window.location.href = '/';
            } else {
                this.handleErrorMessage(data);
            }
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || '登录失败，请重试。';
            this.setState({ errMsg: { ...this.state.errMsg, general: message } });
        }
    }

    handleErrorMessage = data => {
        const message = data.error || data.message || '登录失败，请检查输入。';
        this.setState({
            errMsg: {
                username: /用户名|user_name|用户/.test(message) ? message : '',
                password: /密码/.test(message) ? message : '',
                general: !(/用户名|user_name|用户|密码/.test(message)) ? message : '',
            }
        });
    }

    handleChange = e => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [e.target.name]: e.target.value,
            }
        })
    }

    render() {
        const { username, password } = this.state.userInfo;
        const { errMsg } = this.state;

        return (
            <section className="auth-page" aria-labelledby="login-title">
                <div className="auth-hero">
                    <div className="auth-hero-content">
                        <span className="auth-kicker">欢迎回来</span>
                        <h1>继续完善你的求职资料</h1>
                        <p>用稳定清晰的账号入口管理简历内容、联系方式和投递前需要确认的信息。</p>
                        <div className="auth-stat-grid">
                            <div>
                                <strong>3步</strong>
                                <span>完成账号登录</span>
                            </div>
                            <div>
                                <strong>24h</strong>
                                <span>随时继续编辑</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-panel-wrap">
                    <div className="auth-panel">
                        <div className="auth-heading">
                            <span className="eyebrow">登录</span>
                            <h2 id="login-title">用户登录</h2>
                            <p>输入用户名和密码进入系统。</p>
                        </div>

                        <form className="auth-form" onSubmit={this.handleSubmit}>
                            <div className="field">
                                <label htmlFor="username">用户名</label>
                                <div className={errMsg.username ? 'field-control has-error' : 'field-control'}>
                                    <span className="field-icon" aria-hidden="true">ID</span>
                                    <input
                                        value={username}
                                        type="text"
                                        name="username"
                                        id="username"
                                        onChange={this.handleChange}
                                        placeholder="例如 zhangsan…"
                                        autoComplete="username"
                                        spellCheck={false}
                                        aria-invalid={Boolean(errMsg.username)}
                                        aria-describedby={errMsg.username ? 'login-username-error' : undefined}
                                    />
                                </div>
                                {errMsg.username && <small id="login-username-error" className="field-error" aria-live="polite">{errMsg.username}</small>}
                            </div>

                            <div className="field">
                                <label htmlFor="password">密码</label>
                                <div className={errMsg.password ? 'field-control has-error' : 'field-control'}>
                                    <span className="field-icon" aria-hidden="true">PW</span>
                                    <input
                                        value={password}
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.handleChange}
                                        placeholder="输入登录密码…"
                                        autoComplete="current-password"
                                        aria-invalid={Boolean(errMsg.password)}
                                        aria-describedby={errMsg.password ? 'login-password-error' : 'login-password-help'}
                                    />
                                </div>
                                {errMsg.password ? (
                                    <small id="login-password-error" className="field-error" aria-live="polite">{errMsg.password}</small>
                                ) : (
                                    <small id="login-password-help" className="field-help">请输入登录密码。</small>
                                )}
                            </div>

                            {errMsg.general && <div className="form-alert error" role="alert" aria-live="polite">{errMsg.general}</div>}

                            <button type="submit" className="primary-action">
                                登录
                            </button>
                            <p className="auth-switch">还没有账号？<Link to="/register">立即注册</Link></p>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    loginData: state.login,
});

const mapDispatchToProps = dispatch => ({
    loginFn: bindActionCreators(loginActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
