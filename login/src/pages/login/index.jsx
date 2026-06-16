import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light" style={{ padding: '20px' }}>
                <div className="card shadow-sm" style={{ width: '100%', maxWidth: '440px', borderRadius: '18px' }}>
                    <div className="card-body p-5">
                        <div className="text-center mb-4">
                            <div className="mx-auto mb-3" style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: '32px' }}>🔐</span>
                            </div>
                            <h4 className="card-title mb-1">用户登录</h4>
                            <p className="text-muted small mb-0">输入账号和密码登录系统。</p>
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
                                    <small className="form-text text-muted mt-2">请输入登录密码。</small>
                                )}
                            </div>

                            {errMsg.general && <div className="alert alert-danger py-2">{errMsg.general}</div>}

                            <button type="submit" className="btn btn-primary btn-block btn-lg" style={{ borderRadius: '12px', padding: '12px 0' }}>
                                登录
                            </button>
                        </form>
                    </div>
                </div>
            </div>
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
