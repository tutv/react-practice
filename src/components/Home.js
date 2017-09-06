import React, {Component} from "react";

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1>Trade or View your portfolio</h1>
                <h6>You may Save & Load your data</h6>
                <h6>Click on 'End Day' to begin a New day!</h6>

                <hr/>

                <p>Your Funds: {}</p>
            </div>
        );
    }
}