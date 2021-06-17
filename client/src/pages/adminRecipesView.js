import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default class adminRecipesView extends Component {
    render() {
        return (
            <div>
                <NavbarComp />
                <h1 style={{paddingTop: "5rem"}}>The power to change and destroy all Recipes is at my finger tips!</h1>
                <Footer />
            </div>
        )
    }
}
