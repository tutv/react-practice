import React, {Component} from "react";
import {Route} from "react-router-dom";
import ListTodo from "./components/ListTodo";
import Header from "./components/layouts/Header";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="container-fluid">
                    <Route exact path="/" component={ListTodo}/>
                </div>
            </div>
        );
    }
}

export default App;
