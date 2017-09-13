import React, {Component} from "react";
import {connect} from "react-redux";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";
import Auth from "../../auth/Auth";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.auth = new Auth();
    }

    _handleClickLogin(e) {
        e.preventDefault();
        this.auth.login();
    }

    _toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <Navbar color="faded" className='navbar-expand-lg' light toggleable>
                    <NavbarToggler right onClick={this._toggle.bind(this)}/>
                    <NavbarBrand tag={Link} to="/">Todo App</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this._handleClickLogin.bind(this)} to="/login">Login</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {};

export default connect(null, null)(Header);