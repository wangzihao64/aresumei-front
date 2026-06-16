import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import {actionCreators as registerActionsCreators} from './store';
class Register extends Component {
    state = {
        userInfo: {
            username: '',
            password: '',
            email: '',
            verificationCode: '',
        },
        errMsg: {
            username: '',
            password: '',
            email: '',
            verificationCode: '',
        },
        emailCodeStatus: '',
        isSendingCode: false,
    }
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ errMsg: { username: '', password: '', email: '', verificationCode: '' } });
        const { data } = await this.props.registerFn.registerAc(this.state.userInfo);
        // console.log(data);
        // console.log(this.props.registerData.name);
        const err = data.error || data.message || data.err || '';
        const isUserExists = /用户已经存在|已存在/.test(err);
        const isEmailDuplicate = /Duplicate entry .*uni_user_email/.test(err);
        if (isUserExists) {
            window.alert(err);
            return;
        }
        if (isEmailDuplicate) {
            this.setState({
                errMsg: {
                    username: '',
                    password: '',
                    email: '该邮箱已注册过',
                    verificationCode: '',
                }
            });
            return;
        }
        if (data.status !== 200) {
            const message = err || '注册失败，请检查输入。';
            this.setState({
                errMsg: {
                    username: /用户名|用户/.test(message) && !/已存在/.test(message) ? message : '',
                    password: /密码/.test(message) ? message : '',
                    email: /邮箱|email/.test(message) ? message : '',
                    verificationCode: /验证码/.test(message) ? message : '',
                }
            });
        } else {
            this.setState({ errMsg: { username: '', password: '', email: '', verificationCode: '' } });
            window.alert('注册成功');
            window.location.href = '/login';
        }
    }
    handleChange = e => {
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleSendCode = async () => {
        const { email } = this.state.userInfo;
        if (!email) {
            this.setState({ emailCodeStatus: '请输入邮箱后再获取验证码。' });
            return;
        }
        this.setState({ isSendingCode: true, emailCodeStatus: '' });
        try {
            const { data } = await this.props.registerFn.sendVerificationCodeAc(email);
            if (data.status === 200) {
                this.setState({ emailCodeStatus: '验证码已发送，请查收邮箱。' });
            } else {
                this.setState({ emailCodeStatus: data.error || data.message || '验证码发送失败。' });
            }
        } catch (err) {
            this.setState({ emailCodeStatus: '验证码发送失败，请稍后重试。' });
        } finally {
            this.setState({ isSendingCode: false });
        }
    }

    render() {
        const { username, password, email, verificationCode } = this.state.userInfo;
        const { errMsg, emailCodeStatus, isSendingCode } = this.state;
        return (
            <section className="auth-page" aria-labelledby="register-title">
                <div className="auth-hero register">
                    <div className="auth-hero-content">
                        <span className="auth-kicker">创建账号</span>
                        <h1>建立你的简历资料入口</h1>
                        <p>用邮箱验证码完成注册，后续可集中维护个人信息、工作经历和简历内容。</p>
                        <div className="auth-stat-grid">
                            <div>
                                <strong>1封</strong>
                                <span>邮箱验证码</span>
                            </div>
                            <div>
                                <strong>5项</strong>
                                <span>核心账号信息</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-panel-wrap">
                    <div className="auth-panel register-panel">
                        <div className="auth-heading">
                            <span className="eyebrow">注册</span>
                            <h2 id="register-title">新用户注册</h2>
                            <p>填写信息并获取邮箱验证码，完成账号创建。</p>
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
                                        aria-describedby={errMsg.username ? 'register-username-error' : undefined}
                                    />
                                </div>
                                {errMsg.username && <small id="register-username-error" className="field-error" aria-live="polite">{errMsg.username}</small>}
                            </div>

                            <div className="field">
                                <label htmlFor="email">邮箱</label>
                                <div className={errMsg.email ? 'field-control has-error' : 'field-control'}>
                                    <span className="field-icon" aria-hidden="true">@</span>
                                    <input
                                        value={email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        onChange={this.handleChange}
                                        placeholder="name@example.com…"
                                        autoComplete="email"
                                        spellCheck={false}
                                        aria-invalid={Boolean(errMsg.email)}
                                        aria-describedby={errMsg.email ? 'register-email-error' : undefined}
                                    />
                                </div>
                                {errMsg.email && <small id="register-email-error" className="field-error" aria-live="polite">{errMsg.email}</small>}
                            </div>

                            <div className="verification-row">
                                <div className="field">
                                    <label htmlFor="verificationCode">验证码</label>
                                    <div className={errMsg.verificationCode ? 'field-control has-error' : 'field-control'}>
                                        <span className="field-icon" aria-hidden="true">VC</span>
                                        <input
                                            value={verificationCode}
                                            type="text"
                                            name="verificationCode"
                                            id="verificationCode"
                                            onChange={this.handleChange}
                                            placeholder="例如 123456…"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            spellCheck={false}
                                            aria-invalid={Boolean(errMsg.verificationCode)}
                                            aria-describedby={errMsg.verificationCode ? 'register-code-error' : undefined}
                                        />
                                    </div>
                                    {errMsg.verificationCode && <small id="register-code-error" className="field-error" aria-live="polite">{errMsg.verificationCode}</small>}
                                </div>
                                <button
                                    type="button"
                                    className="secondary-action code-action"
                                    onClick={this.handleSendCode}
                                    disabled={isSendingCode}
                                >
                                    {isSendingCode ? '发送中…' : '获取验证码'}
                                </button>
                            </div>

                            {emailCodeStatus && <div className="form-alert info" role="status">{emailCodeStatus}</div>}

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
                                        placeholder="至少 6 位密码…"
                                        autoComplete="new-password"
                                        aria-invalid={Boolean(errMsg.password)}
                                        aria-describedby={errMsg.password ? 'register-password-error' : 'register-password-help'}
                                    />
                                </div>
                                {errMsg.password ? (
                                    <small id="register-password-error" className="field-error" aria-live="polite">{errMsg.password}</small>
                                ) : (
                                    <small id="register-password-help" className="field-help">建议密码长度不少于 6 位。</small>
                                )}
                            </div>

                            <button type="submit" className="primary-action">
                                立即注册
                            </button>
                            <p className="auth-switch">已有账号？<Link to="/login">去登录</Link></p>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}
const mapStateToProps = state => {
    return {
        registerData: state.register
    };
}
const mapDispatchToProps = dispatch => {
    return {
        registerFn: bindActionCreators(registerActionsCreators, dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Register);
