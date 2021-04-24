import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function userDelete() {
    return (
        <div>
            <NavbarComp />
                <h1>Profile Deleted!</h1>
            <Footer />
        </div>
    )
}

export default userDelete;
