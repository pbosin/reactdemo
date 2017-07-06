import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

export class NavDemo extends React.Component {

    render() {
        return (
          <Navbar>
            <Nav>
                <NavItem href="/home">HOME</NavItem>
                <NavItem href="/accounts">ACCOUNTS</NavItem>
            </Nav>
          </Navbar>
        );
    }
}