import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, Form, Input} from "reactstrap";
import {addTodo} from "../actions/todo";

export class NewTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ''};
    }

    render() {
        return (
            <Form onSubmit={this._handleSubmit.bind(this)}>
                <Input onChange={this._onChangeTitle.bind(this)} value={this.state.title}/>
            </Form>
        );
    }

    _onChangeTitle(e) {

        this.setState({
            title: e.target.value
        });
    }

    _handleSubmit(e) {
        e.preventDefault();

        const {addTodo} = this.props;
        addTodo(this.state.title);

        this.setState({
            title: ''
        });
    }
}

NewTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    addTodo
};

export default connect(null, mapDispatchToProps)(NewTodo);