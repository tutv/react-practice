import React, {Component} from "react";
import {connect} from "react-redux";
import {addTodo, fetchListTodo} from "../actions/todo";
import {getListTodo} from "../selectors/todoSelectors";
import Todo from "./Todo";

class TodoList extends Component {
    componentWillMount() {
        const {fetchListTodo} = this.props;
        fetchListTodo();
    }

    render() {
        return (
            <div className="list-wrapper">
                <button onClick={this._handleAdd.bind(this)}>Add</button>

                {this._renderTodos()}
            </div>
        );
    }

    _renderTodos() {
        const {todos} = this.props;

        return todos.map((id) => {
            return (
                <Todo key={id} id={id}/>
            );
        });
    }


    _handleAdd() {
        const {addTodo} = this.props;

        addTodo('React practice');
    }
}

const mapStateToProps = (state) => {
    return {
        todos: getListTodo(state)
    };
};

const mapDispatchToProps = {
    addTodo,
    fetchListTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
