import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function recipesViewAll() {
    return (
        <div>
            <NavbarComp />
                <h1>All Recipes in the Database</h1>
                <h2>No delete option from here</h2>
            <Footer />
        </div>
    )
}

export default recipesViewAll;
