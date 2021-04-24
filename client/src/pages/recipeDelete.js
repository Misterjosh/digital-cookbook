import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function recipeDelete() {
    return (
        <div>
            <NavbarComp />
                <h1>Recipe Deleted!</h1>
            <Footer />
        </div>
    )
}

export default recipeDelete;