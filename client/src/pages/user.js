import React from 'react';
import Navbar from '../components/navbar/navbar.js';
import Options from '../components/userPageMenu/userPageMenu';
import Footer from '../components/footer/footer';

export default function user() {
    return (
        <div style={{textAlign:"center"}}>
            <Navbar />
            <Options />
            <Footer />
        </div>
    )
}