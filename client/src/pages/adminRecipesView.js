import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';

export default class adminRecipesView extends Component {
    render() {
        const goHome = () => {
            window.location.replace("/")
        };
        const checkExp = () => {
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            if (( Date.now() >= (decoded.exp * 1000) )) {
                console.log("token expired");
                return false;
            } else {
                console.log("token valid");
                return true;
            }
        }
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div>
                    <NavbarComp />
                    <h1 style={{paddingTop: "5rem"}}>Generic Admin page to to view recipes.</h1>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}
