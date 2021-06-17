import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default class adminUsersView extends Component {
    render() {
        return (
            <div>
                <NavbarComp />
                <h1 style={{paddingTop: "5rem"}}>The power to change or destory any user is now mine!</h1>
                <Footer />
            </div>
        )
    }
}
