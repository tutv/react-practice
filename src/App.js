import React, {Component} from "react";
import {Route} from "react-router-dom";
import Home from "./components/Home";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="row">
                    <div className="col-xs-12">
                        <Route path="/" component={Home}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
