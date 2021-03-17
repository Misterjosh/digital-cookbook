import React from 'react';
import Navbar from '../components/navbar/navbar.js';
import Options from '../components/userPageMenu/userPageMenu';
import Footer from '../components/footer/footer';
import jwt_decode from 'jwt-decode';

let userTokenName;

const getTokenName = function () {
    userTokenName = window.localStorage.getItem('jwt')
    userTokenName = userTokenName.replace(/Bearer token: /, '')
    const decoded = jwt_decode(userTokenName);
    console.log(decoded);
    userTokenName = `${decoded.fName} ${decoded.lName}`
    return userTokenName
};

const goHome = () => {
    window.location.replace("/")
};

export default function user() {
    if (localStorage.getItem('jwt')) {
        getTokenName();
        return (
            <div style={{textAlign:"center"}}>
                <Navbar />
                <h1><span className="red-span">Hello {userTokenName}!</span></h1>
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