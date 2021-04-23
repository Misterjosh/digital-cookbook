import React from 'react';
import Navbar from '../components/navbar/Navbar.js';
import Footer from '../components/footer/Footer';
import Options from '../components/recipePageMenu/recipePageMenu';

const goHome = () => {
    window.location.replace("/")
};

export default function recipe() {
    if (localStorage.getItem('jwt')) {
        return (
            <div>
                <Navbar />
                <Options />
                <Footer />
            </div>
        )
    } else
        return (
            <div style={{textAlign:"center"}}>
                <Navbar />
                <h1><span className="red-span">You must log in</span></h1>
                <button onClick={goHome}>Home</button>
                <Footer />
            </div>
        )
}