import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators as registerActionsCreators} from './store';
class Register extends Component {
    state = {
        userInfo: {
            username: '',
            password: '',
        },
        errMsg: {
            username: '',
            password: '',
        },
    }
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ errMsg: { username: '', password: '' } });
        const { data } = await this.props.registerFn.registerAc(this.state.userInfo);
        // console.log(data);
        // console.log(this.props.registerData.name);
        const err = data.error || data.message || data.err || '';
        const isUserExists = /用户已经存在|已存在/.test(err);
        if (isUserExists) {
            window.alert(err);
            return;
        }
        if (data.status !== 200) {
            const message = err || '注册失败，请检查输入。';
            this.setState({
                errMsg: {
                    username: /用户名|用户/.test(message) && !/已存在/.test(message) ? message : '',
                    password: /密码/.test(message) ? message : '',
                }
            });
        } else {
            this.setState({ errMsg: { username: '', password: '' } });
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
    render() {
        const { username, password } = this.state.userInfo;
        const { errMsg } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input type="text" className="form-control" name="username" id="username" defaultValue={username} onChange={this.handleChange} />
                </div>
                <small className="form-text text-danger">
                    {errMsg.username}
                </small>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" defaultValue={password} onChange={this.handleChange} />
                </div>
                <small className="form-text text-danger">
                    {errMsg.password}
                </small>
                {/* <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" className="form-control" name="passwordConfirm" id="passwordConfirm" defaultValue={passwordConfirm} onChange={this.handleChange} />
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
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