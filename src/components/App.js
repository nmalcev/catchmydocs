import React, { Component } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'

import IndexPage from './pages/IndexPage/IndexPage';
import PrivatePage from './pages/PrivatePage/PrivatePage';
import LoginPage from './pages/LoginPage/LoginPage';
// TODO add lazyLoading
import DocumentPage from './pages/DocumentPage/DocumentPage';
import DocumentTestPage from './pages/DocumentTestPage/DocumentTestPage';

const mapStateToProps = state => {
    return {
        isAuthorizing: state.session.isAuthorizing,
        isAuthorized: !!state.session.userId,
    }
};

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/auth" component={LoginPage} exact/>
                {this.props.isAuthorized ? [
                    <Route path="/settings" component={PrivatePage} exact/>,
                    <Route path="/document" component={DocumentPage} exact/>,
                    <Route path="/documenttest" component={DocumentTestPage} exact/>
                ] : [
                    <Redirect from="/settings" to="/auth"/>,
                    <Redirect from="/document" to="/auth"/>,
                    <Redirect from="/documenttest" to="/auth"/>
                ]}
                <Route path="/" component={IndexPage} exact />
                <Redirect from="/dashboard" to="/settings"/>
                <Route component={() => <div>Not found</div>} />
            </Switch>
        );
    }
}

export default connect(mapStateToProps, null)(App);
