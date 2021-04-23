import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function recipesViewAll() {
    return (
        <div>
            <Navbar />
                <h1>All Recipes in the Database</h1>
                <h2>No delete option from here</h2>
            <Footer />
        </div>
    )
}

export default recipesViewAll;
