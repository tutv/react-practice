import React, {Component} from "react";
import {connect} from "react-redux";

import {authVerifyCallback} from "../actions/auth";
import {isAuthenticated} from "../selectors/authSelectors";
import {Redirect} from "react-router-dom";

class LoginCallback extends Component {
    componentWillMount() {
        const {location, authVerifyCallback} = this.props;
        const {hash} = location;

        if (/access_token|id_token|error/.test(hash)) {
            authVerifyCallback();
        }
    }

    render() {
        const {isAuthenticated} = this.props;
        const redirectTo = {pathname: '/'};

        if (isAuthenticated) {
            return (
                <Redirect to={redirectTo}/>
            );
        }

        return (
            <div>
                <div className="loading">
                    Loading
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    authVerifyCallback
};

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state, props)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallback);