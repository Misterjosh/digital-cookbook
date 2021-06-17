import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default class adminPage extends Component {
    render() {
        return (
            <div>
                <NavbarComp />
                <h1 style={{paddingTop: "5rem"}}>Generic Admin page to have buttons to view recipes and users.</h1>
                <Footer />
            </div>
        )
    }
}
