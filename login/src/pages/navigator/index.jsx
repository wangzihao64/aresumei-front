import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export default class index extends Component {
    render() {
        return (
            <nav className="app-nav" aria-label="主导航">
                <NavLink className="app-brand" to="/">
                    <span className="brand-mark" aria-hidden="true">A</span>
                    <span>AresuMei</span>
                </NavLink>
                <ul className="app-nav-list">
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'app-nav-link active' : 'app-nav-link'} to="/resume-upload">
                            面试问题
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'app-nav-link active' : 'app-nav-link'} to="/register">
                            注册
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => isActive ? 'app-nav-link active' : 'app-nav-link'} to="/login">
                            登录
                        </NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}
