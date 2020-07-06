import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Field from '../../../UI/Field/Field';
import {auth} from '../../../../store/actions/auth';
import {cloneObject} from '../../../utils/deepClone';
import './LoginForm.css';


class LoginForm extends Component {

    formElement = {}
    state = {
        fields: [
            {
                elementType: null,
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your E-mail',
                    required: true,
                    name: 'login',
                    onInvalid: e => {
                        const inp = e.target;
                        inp.setCustomValidity('');
                        if (inp.validity.valid) return;
                        inp.setCustomValidity('Please check the email');
                    },
                },
                elementLabel: 'E-mail:',
            },
            {
                elementType: null,
                elementConfig: {
                    type: 'password',
                    required: true,
                    name: 'password',
                },
                elementLabel: 'Password:',
                onInvalid: e => {
                    const inp = e.target;
                    inp.setCustomValidity('');
                    if (inp.validity.valid) return;
                    inp.setCustomValidity('Please check the password');
                },
            }
        ],
        isSignup: false, // if true - create a new account
    }

    /** executed before render() */
    static getDerivedStateFromProps(props, state) {
        if (props.isAuthorizing) {
            console.log('Authorization has begun');
        }
        // const nextState = cloneObject(state);
        // return nextState;
        return state;
    }

    onSubmitHandler = event => {
        event.preventDefault();
        this.formElements = event.target.elements;
        this.props.onAuth(
            this.formElements.login.value.trim(),
            this.formElements.password.value.trim(),
            this.state.isSignup,
            this.props.history
        );
    }

    onSwitchSignMode = e => {
        e.preventDefault();        
        this.setState(state => ({
            ...state,
            isSignup: !state.isSignup
        }))
    }

	render() {
        return (
            <form className="LoginForm" onSubmit={this.onSubmitHandler} ref="form">
                {this.state.fields.map((fieldConfig, i) => {
                    return (
                        <div className="LoginForm__row" key={i}>
                            <Field   {...fieldConfig}/>
                        </div>
                    )
                })}
                <div className="LoginForm__row">
                    <button 
                        className="btn btn_secondary" 
                        type="submit" 
                        disabled={this.props.isAuthorizing}
                    >{this.state.isSignup ? 'Signup' : 'Login'}</button>
                </div>
                <div className="LoginForm__row">
                    <span>{this.state.isSignup ? 'Already have an account?' : 'No account yet?'}</span>&nbsp;
                    <button className="btnlink" onClick={this.onSwitchSignMode}>{this.state.isSignup ? 'Switch to login' : 'Signup here'}</button>
                </div>
            </form>
        );
	}
}

const mapStateToProps = state => {
    return {
        isAuthorizing: state.session.isAuthorizing
    }
};

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignup, history) => dispatch(auth(email, password, isSignup, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));

