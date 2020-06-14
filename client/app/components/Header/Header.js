import { Nav, Navbar } from "react-bootstrap";

import { Link } from "react-router-dom";

import React, { Component } from "react";

export default class Header extends Component {
  render() {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/"
    )
      return null;
    else
      return (
        <div>
          <Navbar collapseOnSelect bg="primary" variant="dark">
            <Navbar.Brand href="/home">Code-Pixer CRM</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Link className="navbar_styler" to="/home">
                  Home
                </Link>
                <Link className="navbar_styler" to="/tracking">
                  Tracking List
                </Link>
                <Link className="navbar_styler" to="/followup">
                  Follow ups
                </Link>
                <Link className="navbar_styler" to="/contact">
                  Contacts
                </Link>
                <Link className="navbar_styler" to="/product">
                  Products
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {/* <Navbar
            collapseOnSelect
            expand="lg"
            className="navbar navbar-dark bg-primary"
          >
            <Navbar.Brand href="/home">Code-Pixer CRM</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto nav nav-pills">
                <Link to="/home">Home</Link>
                <Link to="/tracking">Tracking List</Link>
                <Link to="/followup">Follow ups</Link>
                <Link to="/contact">Contacts</Link>
                <Link to="/product">Products</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar> */}
        </div>
      );
  }
}
