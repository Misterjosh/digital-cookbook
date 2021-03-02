import React from 'react';
import Navbar from '../components/navbar/navbar.js';
import Footer from '../components/footer/footer';
import Options from '../components/recipePageMenu/recipePageMenu';

export default function recipe() {
    return (
        <div>
            <Navbar />
            <Options />
            <Footer />
        </div>
    )
}