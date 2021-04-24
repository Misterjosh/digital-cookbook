import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function recipeView() {
    return (
        <div>
            <NavbarComp />
                <h1>Looking at a Recipe</h1>
            <Footer />
        </div>
    )
}

export default recipeView;
