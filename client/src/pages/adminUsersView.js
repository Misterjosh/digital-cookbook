import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';
import API from '../utils/api';
import AdminUsersDisplay from '../components/admin/AdminUsersDisplay';

export default class adminUsersView extends Component {
    state = {
        users: []
    };

    async componentDidMount() {
        await API.getAllUsers()
            .then((allUsers) => {
                this.setState({ users: allUsers.data });
                // console.log(this.state.users);
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
        const onDeleteClick = (idToDelete) => {
            API.deleteUser(idToDelete)
            .then(() => {
            window.location.replace("/admin/users");
            })
            .catch(error => console.log(error));
    }
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div style={{}}>
                    <NavbarComp />
                    <h1 style={{paddingTop: "5rem", textAlign: "center"}}><span className="red-span">Admin Users Page</span></h1>
                    <AdminUsersDisplay arrUsers={this.state.users} delClick={onDeleteClick} />
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}
