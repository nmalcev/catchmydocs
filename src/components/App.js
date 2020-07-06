import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import loadComponent from './hoc/LoadComponent/LoadComponent';

import IndexPage from './pages/IndexPage/IndexPage';
import PrivatePage from './pages/PrivatePage/PrivatePage';
import LoginPage from './pages/LoginPage/LoginPage';

const mapStateToProps = state => {
    return {
        isAuthorizing: state.session.isAuthorizing,
        isAuthorized: !!state.session.userId,
    }
};
const LoginPageURL = '/login';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path={LoginPageURL} component={LoginPage} exact/>
                {this.props.isAuthorized ? [
                    <Route key="1" path="/settings" component={PrivatePage} exact/>,
                    <Route key="2" path="/document" render={loadComponent(
                        () => import('./pages/DocumentPage/DocumentPage'),
                        <h3>Loading...</h3>
                    )}/>,
                    <Route key="3" path="/documenttest" render={loadComponent(
                        () => import('./pages/DocumentTestPage/DocumentTestPage'),
                        <h3>Loading...</h3>
                    )}/>
                ] : [
                    <Redirect key="4" from="/settings" to={LoginPageURL}/>,
                    <Redirect key="5" from="/document" to={LoginPageURL}/>,
                    <Redirect key="6" from="/documenttest" to={LoginPageURL}/>
                ]}
                <Route path="/" component={IndexPage} exact />
                <Redirect from="/dashboard" to="/settings"/>
                <Route component={() => <div>Not found</div>} />
            </Switch>
        );
    }
}

export default connect(mapStateToProps, null)(App);
