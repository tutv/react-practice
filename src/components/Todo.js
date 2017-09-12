import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {editTitle, removeTodo, saveTodo, toggleTodo} from "../actions/todo";
import {getTodoItem} from "../selectors/todoSelectors";

export class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {timer: null};
    }

    render() {
        const {todo} = this.props;
        const complete = todo.get('complete');

        return (
            <div className="todo">
                <div className="input-group">
                      <span className="input-group-addon">
                        <input type="checkbox"
                               checked={complete}
                               onChange={this.handleClick.bind(this)}
                               aria-label="Checkbox for following text input"/>
                      </span>
                    <input type="text"
                           className="form-control"
                           onChange={this.onChangeTitle.bind(this)}
                           value={todo.get('title')}/>
                    <span className="remove" onClick={this.handleRemove.bind(this)}>x</span>
                </div>
            </div>
        );
    }

    onChangeTitle(e) {
        const {todo, editTitle, saveTodo} = this.props;
        const newTitle = e.target.value;

        editTitle(todo, newTitle);

        const {timer} = this.state;
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            saveTodo(todo);
        }, 1000);

        this.setState({
            timer: newTimer
        });
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

Todo.propTypes = {
    id: PropTypes.string.isRequired,
    todo: PropTypes.object.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    removeTodo: PropTypes.func.isRequired,
    editTitle: PropTypes.func.isRequired,
    saveTodo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    toggleTodo,
    removeTodo,
    editTitle,
    saveTodo
};

const mapStateToProps = (state, props) => {
    return {
        todo: getTodoItem(state, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);