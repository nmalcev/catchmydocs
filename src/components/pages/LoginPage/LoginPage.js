import React, { Component } from 'react';
import LoginForm from './LoginForm/LoginForm';
import {connect} from 'react-redux';

import {logout} from '../../../store/actions/auth';
import './LoginPage.scss';

const mapStateToProps = state => {
    return {
        isAuthorizing: state.session.isAuthorizing,
        isAuthorized: !!state.session.userId,
    }
};
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});


class LoginPage extends Component {
    onLogoutHandler = () => {
        this.props.logout();
    }

	render() {
        return (
            <div className="LoginPage">
                {this.props.isAuthorized ?
                    <div className="LoginPage_wrap">
                        <button className="btn" onClick={this.onLogoutHandler}>Log out</button>
                    </div>
                    : 
                    <div className="LoginPage_wrap">
                        <h3 className="LoginForm_title">Get started</h3>
                        <LoginForm />
                        <ul className="LoginForm_links">
                            <li><a href="javascript:void(0)">Terms</a></li>
                            <li><a href="javascript:void(0)">Privacy policy</a></li>
                            <li><a href="javascript:void(0)"></a></li>
                        </ul>
                    </div>
                }
            </div>
        );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
