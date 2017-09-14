import React, {Component} from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import PropTypes from 'prop-types';

import ListTodo from "./containers/ListTodo";
import Header from "./components/layouts/Header";
import LoginCallback from "./containers/LoginCallback";
import {startupCheck} from "./actions/auth";

class App extends Component {
    componentWillMount() {
        const {startupCheck} = this.props;
        startupCheck();
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className="container-fluid">
                    <Route exact path="/" component={ListTodo}/>
                    <Route exact path="/callback" component={LoginCallback}/>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    startupCheck: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    startupCheck
};

export default connect(null, mapDispatchToProps)(App);
