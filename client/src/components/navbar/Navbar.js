import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import './navbar.css';
import jwt_decode from 'jwt-decode';

const checkExp = () => {
  const token = window.localStorage.getItem('dcb-jwt');
  const noBearer = token.replace(/Bearer token: /, '');
  const decoded = jwt_decode(noBearer);
  if (( Date.now() >= (decoded.exp * 1000) )) {
      return false;
  } else {
      return true;
  }
};

const logOut = () => {
  localStorage.removeItem('dcb-jwt');
  localStorage.removeItem('current-recipe');
  localStorage.removeItem('admin-id-user');
  localStorage.removeItem('admin--recipe');
  window.location.replace("/");
};

const validAdmin = () => {
  localStorage.getItem('dcb-jwt');
  const token = window.localStorage.getItem('dcb-jwt');
  const noBearer = token.replace(/Bearer token: /, '');
  const decoded = jwt_decode(noBearer);
  const validated = decoded.tonyDanza;
  return validated;
};

const NavbarComp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  if (localStorage.getItem('dcb-jwt') && checkExp() === true && validAdmin() === true) {
    return (
        <div style={{position: "fixed", width: "100%", textAlign: "center"}}>
          <Navbar className="navbar" light expand="md">
            <NavbarBrand className="navbrand" href="/">Digial Cookbook <i className="fas fa-book-open"></i></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        User Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/user/view">
                            View Account
                        </DropdownItem>
                        <DropdownItem href="/user/edit">
                            Edit Account
                        </DropdownItem>
                        <DropdownItem href="/user/delete">
                            Delete Account
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Recipes
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/recipes/view">
                            Browse Recipes
                        </DropdownItem>
                        <DropdownItem href="/recipes/view/user">
                            Your Recipes
                        </DropdownItem>
                        <DropdownItem href="/recipe/create">
                            Create a Recipe
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Admin Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/admin/users">
                            View All Users
                        </DropdownItem>
                        <DropdownItem href="/admin/recipes">
                            View All Recipes
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            <button className="btn submit-btn" style={{backgroundColor: "#c3c0c0"}} onClick={logOut}>Log Out</button>
            </Collapse>
          </Navbar>
        </div>
      );
  } else if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
    return (
        <div style={{position: "fixed", width: "100%", textAlign: "center"}}>
          <Navbar className="navbar" light expand="md">
            <NavbarBrand className="navbrand" href="/">Digial Cookbook <i className="fas fa-book-open"></i></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        User Options
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/user/view">
                            View Account
                        </DropdownItem>
                        <DropdownItem href="/user/edit">
                            Edit Account
                        </DropdownItem>
                        <DropdownItem href="/user/delete">
                            Delete Account
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Recipes
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/recipes/view">
                            Browse Recipes
                        </DropdownItem>
                        <DropdownItem href="/recipes/view/user">
                            Your Recipes
                        </DropdownItem>
                        <DropdownItem href="/recipe/create">
                            Create a Recipe
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            <button className="btn submit-btn" style={{backgroundColor: "#c3c0c0"}} onClick={logOut}>Log Out</button>
            </Collapse>
          </Navbar>
        </div>
      );
  } else {
    return (
        <div style={{position: "fixed", width: "100%"}}>
          <Navbar className="navbar" light expand="md">
            <NavbarBrand className="navbrand" href="/">Digial Cookbook <i className="fas fa-book"></i></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/">Log In</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
  }
  
}

export default NavbarComp;