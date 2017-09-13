import React, {Component} from "react";
import {connect} from "react-redux";

import {authVerifyCallback} from "../actions/auth";
import {isAuthenticated} from "../selectors/authSelectors";

class LoginCallback extends Component {
    componentWillUpdate() {
        const {isAuthenticated, history} = this.props;

        if (isAuthenticated) {
            history.push('/');
        }
    }

    render() {
        const {location, authVerifyCallback} = this.props;
        const {hash} = location;

        if (/access_token|id_token|error/.test(hash)) {
            authVerifyCallback();
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