import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import Footer from '../components/footer/Footer.js';
import jwt_decode from 'jwt-decode';
import API from '../utils/api';
import AdminUsersDisplay from '../components/admin/AdminUsersDisplay';

export default class adminUsersView extends Component {
    state = {
        users: [],
        validAdmin: true,
        loading: true
    };

    async componentDidMount() {
        const token = window.localStorage.getItem('dcb-jwt');
        const noBearer = token.replace(/Bearer token: /, '');
        const decoded = jwt_decode(noBearer);
        const validated = decoded.tonyDanza;
        await API.getAllUsers()
            .then((allUsers) => {
                this.setState({ 
                    users: allUsers.data, 
                    validAdmin: validated,
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
                return false;
            } else {
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
        const onEditClick = (idToEdit) => {
            window.localStorage.setItem('admin-id-user', idToEdit);
            window.location.replace('/admin/edit/user');
        }
        if (localStorage.getItem('dcb-jwt') && checkExp() === true && this.state.validAdmin === true) {
            return (
                <div>
                    {this.state.loading || !this.state.users ? (
                    <div> loading ...</div>
                    ) : (
                    <div>
                        <NavbarComp />
                        <h1 style={{paddingTop: "5rem", textAlign: "center"}}><span className="red-span">Admin Users Page</span></h1>
                        <AdminUsersDisplay arrUsers={this.state.users} delClick={onDeleteClick} editClick={onEditClick}/>
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
