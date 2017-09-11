import React, {Component} from "react";
import {connect} from "react-redux";
import {removeTodo, toggleTodo} from "../actions/todo";
import {getTodoItem} from "../selectors/todoSelectors";

class Todo extends Component {
    render() {
        const todo = this.props.todo.toJS();

        return (
            <li className={todo.complete ? 'completed' : ''}>
                <span onClick={this.handleClick.bind(this)}>{todo.title}</span>
                <span className="remove" onClick={this.handleRemove.bind(this)}>x</span>
            </li>
        );
    }

    handleRemove() {
        const {removeTodo, todo} = this.props;
        removeTodo(todo);
    }

    handleClick() {
        const {toggleTodo, todo} = this.props;
        toggleTodo(todo);
    }
}

const mapDispatchToProps = {
    toggleTodo,
    removeTodo
};

const mapStateToProps = (state, props) => {
    return {
        todo: getTodoItem(state, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);