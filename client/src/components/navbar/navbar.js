import React, { Component } from 'react';
import { MenuItems } from "./menuItems";
import { Button } from "./button";
import './navbar.css';


class Navbar extends Component {
    state = { toggle: false }

    handleClick = () => {
        this.setState({ toggle: !this.state.toggle })
    }

    render() {
        return(
            <nav className="navbarItems">
                <h1 className="navbar-logo">Digital Cookbook<i className="fas fa-book"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.toggle ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.toggle ? "nav-menu active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>{item.title}</a>
                            </li>
                        )
                    })}
                </ul>
                <Button>Sign up</Button>
            </nav>
        )
    }
}

export default Navbar;