import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchListTodo} from "../actions/todo";
import {getListTodo} from "../selectors/todoSelectors";
import Todo from "../components/Todo";
import NewTodo from "../components/NewTodo";

class TodoList extends Component {
    componentWillMount() {
        const {fetchListTodo} = this.props;
        fetchListTodo();
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <h1>Todo App</h1>
                    <NewTodo/>

                    <div className="todo-list">
                        {this._renderTodos()}
                    </div>
                </div>
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
}

const mapStateToProps = (state) => {
    return {
        todos: getListTodo(state)
    };
};

const mapDispatchToProps = {
    fetchListTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
