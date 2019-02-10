import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toogle = this.toogle.bind(this);
    }

    toogle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={ Link } to="/">Home</NavbarBrand>
                <NavbarToggler onClick={this.toggle}></NavbarToggler>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="https://www.linkedin.com/in/rodrigoavalente/">LinkedIn</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/rodrigoavalente/todo">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}