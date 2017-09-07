import React, {Component} from "react";
import {connect} from "react-redux";
import {toggleTodo} from "../actions/todo";
import {getTodoItem} from "../reducers/index";

class Todo extends Component {
    render() {
        const {todo} = this.props;

        return (
            <li className={todo.complete ? 'completed' : ''} onClick={this.handleClick.bind(this)}>{todo.title}</li>
        );
    }

    handleClick() {
        const {toggleTodo, todo} = this.props;
        toggleTodo(todo);
    }
}

const mapDispatchToProps = {
    toggleTodo
};

const mapStateToProps = (state, props) => {
    return {
        todo: getTodoItem(state, props.id)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);