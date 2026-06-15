import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" style={{ padding: '20px' }}>
                <div className="card shadow-sm" style={{ width: '100%', maxWidth: '520px', borderRadius: '18px' }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <div className="mx-auto mb-3" style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '34px' }}>📝</span>
                            </div>
                            <h4 className="card-title mb-1">新用户注册</h4>
                            <p className="text-muted small mb-0">填写信息并获取邮箱验证码，完成注册。</p>
                        </div>

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username" className="font-weight-bold">用户名</label>
                                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                                    <span className="input-group-text bg-white border-0" style={{ width: '56px', justifyContent: 'center' }}>👤</span>
                                    <input
                                        value={username}
                                        type="text"
                                        className="form-control border-0"
                                        name="username"
                                        id="username"
                                        onChange={this.handleChange}
                                        placeholder="请输入用户名"
                                    />
                                </div>
                                {errMsg.username && <small className="form-text text-danger mt-2">{errMsg.username}</small>}
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="email" className="font-weight-bold">邮箱</label>
                                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                                    <span className="input-group-text bg-white border-0" style={{ width: '56px', justifyContent: 'center' }}>📧</span>
                                    <input
                                        value={email}
                                        type="email"
                                        className="form-control border-0"
                                        name="email"
                                        id="email"
                                        onChange={this.handleChange}
                                        placeholder="请输入邮箱"
                                    />
                                </div>
                                {errMsg.email && <small className="form-text text-danger mt-2">{errMsg.email}</small>}
                            </div>

                            <div className="form-row align-items-center mb-3">
                                <div className="col">
                                    <label htmlFor="verificationCode" className="font-weight-bold">验证码</label>
                                    <input
                                        value={verificationCode}
                                        type="text"
                                        className="form-control shadow-sm"
                                        name="verificationCode"
                                        id="verificationCode"
                                        onChange={this.handleChange}
                                        placeholder="请输入验证码"
                                    />
                                    {errMsg.verificationCode && <small className="form-text text-danger mt-2">{errMsg.verificationCode}</small>}
                                </div>
                                <div className="col-auto mt-4 pt-1">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={this.handleSendCode}
                                        disabled={isSendingCode}
                                    >
                                        {isSendingCode ? '发送中...' : '获取验证码'}
                                    </button>
                                </div>
                            </div>

                            {emailCodeStatus && <div className="alert alert-info py-2" role="alert">{emailCodeStatus}</div>}

                            <div className="form-group mb-4">
                                <label htmlFor="password" className="font-weight-bold">密码</label>
                                <div className="input-group shadow-sm rounded-pill overflow-hidden">
                                    <span className="input-group-text bg-white border-0" style={{ width: '56px', justifyContent: 'center' }}>🔒</span>
                                    <input
                                        value={password}
                                        type="password"
                                        className="form-control border-0"
                                        name="password"
                                        id="password"
                                        onChange={this.handleChange}
                                        placeholder="请输入密码"
                                    />
                                </div>
                                {errMsg.password ? (
                                    <small className="form-text text-danger mt-2">{errMsg.password}</small>
                                ) : (
                                    <small className="form-text text-muted mt-2">建议密码长度不少于 6 位。</small>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ borderRadius: '12px', padding: '12px 0' }}>
                                立即注册
                            </button>
                        </form>
                    </div>
                </div>
            </div>
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