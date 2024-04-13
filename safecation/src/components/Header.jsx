import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
import 'bootstrap/scss/bootstrap.scss';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <Container>
          {/* <NavbarToggler onClick={toggleNav} /> */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/">ds</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Pricing</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
