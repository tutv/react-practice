import React, {Component} from "react";
import {connect} from "react-redux";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";

import {login} from "../../actions/auth";
import {getProfile, isAuthenticated} from "../../selectors/authSelectors";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    _handleClickLogin(e) {
        e.preventDefault();
        const {login} = this.props;
        login();
    }

    _toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {isAuthenticated, getProfile} = this.props;

        let link = null;
        if (isAuthenticated) {
            const name = getProfile.get('nickname');
            link = <NavLink tag={Link} to="/settings">Hello <strong>{name}</strong></NavLink>;
        } else {
            link = <NavLink tag={Link} onClick={this._handleClickLogin.bind(this)} to="/login">Login</NavLink>;
        }

        return (
            <div>
                <Navbar color="faded" className='navbar-expand-lg' light toggleable>
                    <NavbarToggler right onClick={this._toggle.bind(this)}/>
                    <NavbarBrand tag={Link} to="/">Todo App</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {link}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

Header.propTypes = {};

const mapDispatchToProps = {
    login
};

const mapStateToProps = (state, props) => ({
    isAuthenticated: isAuthenticated(state),
    getProfile: getProfile(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);