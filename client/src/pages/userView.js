import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function userView() {
    return (
        <div>
            <Navbar />
                <h1>Looking at your profile!</h1>
                <h2>Password never shown</h2>
            <Footer />
        </div>
    )
}

export default userView;
