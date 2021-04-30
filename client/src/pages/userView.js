import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';
import UserView from '../components/userView/UserView';
import API from '../utils/api';

let userTokenName;
let userId;
var fName = window.localStorage.getItem('first');
var lName = window.localStorage.getItem('last');
var email = window.localStorage.getItem('email');
var created = window.localStorage.getItem('created');
var updated = window.localStorage.getItem('updated');


const getTokenName = () => {
    userTokenName = window.localStorage.getItem('dcb-jwt')
    userTokenName = userTokenName.replace(/Bearer token: /, '')
    const decoded = jwt_decode(userTokenName);
    userTokenName = `${decoded.fName} ${decoded.lName}`
    return userTokenName
};

const getUserId = () => {
    userId = window.localStorage.getItem('dcb-jwt')
    userId = userId.replace(/Bearer token: /, '')
    const decoded = jwt_decode(userId);
    userId = `${decoded.id}`;
    return userId
};

const getUser = (userId) => {
    API.getUserInfo(userId)
    .then((user) => {
        window.localStorage.setItem('first', user.data.name.first);
        window.localStorage.setItem('last', user.data.name.last);
        window.localStorage.setItem('email', user.data.email);
        window.localStorage.setItem('created', user.data.created);
        window.localStorage.setItem('updated', user.data.updated);
    })
    .catch((error) => console.log(error));
};

const goHome = () => {
    window.location.replace("/")
};

if (localStorage.getItem('dcb-jwt')) {
    getTokenName();
    getUserId();
    getUser();
}

function userView() {
    if (localStorage.getItem('dcb-jwt')) {
        return (
            <div style={{textAlign:"center"}}>
                <NavbarComp />
                <h1><span className="red-span">Profile Details for {userTokenName} {userId}</span></h1><br />
                <UserView first={fName} last={lName} email={email} created={created} updated={updated} />
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

export default userView;
