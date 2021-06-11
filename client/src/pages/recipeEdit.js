import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

export default class recipeEdit extends Component {
    render() {
        return (
            <div>
                <NavbarComp />
                    <h1>Editing Recipe!</h1>
                <Footer />
            </div>
        )
    }
}