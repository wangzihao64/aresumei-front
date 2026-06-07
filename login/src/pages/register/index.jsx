import React, { Component } from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators as registerActionsCreators} from './store';
class Register extends Component {
    state = {
        username: '',
        password: '',
        passwordConfirm: ''
    }
    handleSubmit = e=>{
        e.preventDefault();
        // this.props.registerFn.registerAc();
        console.log(this.props.registerData.name);
    }
    handleChange = e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { username, password, passwordConfirm } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input type="text" className="form-control" name="username" id="username" defaultValue={username} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" defaultValue={password} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" className="form-control" name="passwordConfirm" id="passwordConfirm" defaultValue={passwordConfirm} onChange={this.handleChange} />
                </div>
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