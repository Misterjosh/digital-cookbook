import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Options from '../components/userPageMenu/userPageMenu';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';

let userTokenName;

const getTokenName = () => {
    userTokenName = window.localStorage.getItem('dcb-jwt')
    userTokenName = userTokenName.replace(/Bearer token: /, '')
    const decoded = jwt_decode(userTokenName);
    userTokenName = `${decoded.fName} ${decoded.lName}`
    return userTokenName
};

const goHome = () => {
    window.location.replace("/")
};

export default function user() {
    if (localStorage.getItem('dcb-jwt')) {
        getTokenName();
        return (
            <div style={{textAlign:"center"}}>
                <NavbarComp />
                <h1><span className="red-span">Hello {userTokenName}!</span></h1>
                <Options />
                <Footer />
            </div>
        )
    } else
        return (
            <div style={{textAlign:"center"}}>
                <NavbarComp />
                <h1><span className="red-span">You must log in</span></h1>
                <button onClick={goHome}>Home</button>
                <Footer />
            </div>
        )
}