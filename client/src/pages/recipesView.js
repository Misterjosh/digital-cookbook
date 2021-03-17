import React from 'react';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

function recipesView() {
    return (
        <div>
            <Navbar />
                <h1>Looking at User's specific recipes!</h1>
                <h2>Once a recipe is selected and everything populates, deleting and editing a recipe can happen here.</h2>
            <Footer />
        </div>
    )
}

export default recipesView;