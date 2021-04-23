import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

function userEdit() {
    return (
        <div>
            <Navbar />
                <h1>Editing Your Profile!</h1>
                <h2>Password change only. Don't show current or new password.</h2>
            <Footer />
        </div>
    )
}

export default userEdit;
