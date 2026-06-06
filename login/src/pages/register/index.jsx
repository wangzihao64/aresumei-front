import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password</label>
                    <input type="password" className="form-control" id="passwordConfirm" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}
