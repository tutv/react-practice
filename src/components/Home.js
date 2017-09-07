import React, {Component} from "react";
import {connect} from "react-redux";

import {funds} from "../reducers";

import {increaseFunds} from "../actions/portfolio";

class Home extends Component {
    render() {
        const {funds} = this.props;

        return (
            <div className="home">
                <h1>Trade or View your portfolio</h1>
                <h6>You may Save & Load your data</h6>
                <h6>Click on 'End Day' to begin a New day!</h6>

                <hr/>

                <button onClick={this._handleIncrease.bind(this)}>Increase</button>

                <p>Your Funds: {funds}</p>
            </div>
        );
    }

    _handleIncrease() {
        const {increaseFunds} = this.props;

        increaseFunds(100);
    }
}

const mapStateToProps = (state) => {
    return {
        funds: funds(state)
    }
};


export default connect(mapStateToProps, {
    increaseFunds,
})(Home);