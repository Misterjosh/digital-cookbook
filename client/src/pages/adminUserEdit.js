import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';
import API from '../utils/api';
import UserInfoCard from '../components/admin/edit/UserInfoCard';

export default class adminPage extends Component {
    state = {
        validAdmin: true,
        loading: true,
        user: null
    };

    async componentDidMount() {
        const idToEdit = window.localStorage.getItem('admin-id-user');
        const token = window.localStorage.getItem('dcb-jwt');
        const noBearer = token.replace(/Bearer token: /, '');
        const decoded = jwt_decode(noBearer);
        const userId = `${decoded.id}`;
        await Promise.all([API.getUserInfo({ params: { id: idToEdit } }), API.getUserInfo({ params: { id: userId } })])
            .then(([user, userInfo]) => {
                let userData = {
                    fName: user.data.name.first,
                    lName: user.data.name.last,
                    email: user.data.email,
                    admin: `${user.data.admin}`
                };
                this.setState({ 
                    user: userData, 
                    validAdmin: userInfo.data.admin, 
                    loading: false 
                });
            })
            .catch((error) => console.log(error));
    }

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
                    {this.state.loading || !this.state.user ? (
                    <div> loading ...</div>
                    ) : ( 
                    <div>
                        <NavbarComp />
                        <h1 className="red-span" style={{paddingTop: "5rem", textAlign: "center"}}>Generic Admin page to edit a user.</h1>
                        <UserInfoCard
                            first={this.state.user.fName} 
                            last={this.state.user.lName} 
                            email={this.state.user.email}
                            admin={(`${this.state.user.admin}`.toUpperCase())}
                        />
                        <Footer />
                    </div>
                    )}
                </div>
            )
        } else {
            goHome();
        }
    }
}
