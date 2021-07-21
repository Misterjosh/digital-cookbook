import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';
import API from '../utils/api';
import UserInfoCard from '../components/admin/edit/UserInfoCard';
import UserEditForm from '../components/admin/edit/UserEditForm';

export default class adminPage extends Component {
    state = {
        validAdmin: true,
        loading: true,
        user: null,
        fName: "",
        lName: "",
        email: "",
        admin: "",
        password: ""
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

    // This deals with each change from a value on the form
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // function to set admin to true
    adminTrue = () => {
        this.setState({ admin: true });
    }

    // function to set admin to false
    adminFalse = () => {
        this.setState({ admin: false });
    }

    // makes sure there is a 
    onSubmit = event => {
        event.preventDefault();
        const updatedUser = {
            firstName: this.state.fName,
            lastName: this.state.lName,
            email: this.state.email,
            password: this.state.password,
            adminStatus: this.state.admin
        }
        console.log("submit button pressed");
        console.log(updatedUser);
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
        if (localStorage.getItem('dcb-jwt') && checkExp() === true && this.state.validAdmin === true) {
            return (
                <div>
                    {this.state.loading || !this.state.user ? (
                    <div> loading ...</div>
                    ) : ( 
                    <div>
                        <NavbarComp />
                        <div className="container" style={{paddingTop: "5rem", paddingBottom: "5rem"}}>
                            <h1 className="red-span" style={{textAlign: "center", paddingBottom: "2rem"}}>What would you like to change?</h1>
                            <div className="row">
                                <div className="col col-lg-6 col-sm-12" style={{textAlign:"center"}}>
                                    <UserInfoCard
                                        first={this.state.user.fName} 
                                        last={this.state.user.lName} 
                                        email={this.state.user.email}
                                        admin={(`${this.state.user.admin}`.toUpperCase())}
                                    />
                                </div>
                                <div className="col col-lg-6 col-sm-12">
                                    <UserEditForm 
                                        fName={this.state.fName}
                                        lName={this.state.lName}
                                        email={this.state.email}
                                        password={this.state.password}
                                        onSubmit={this.onSubmit}
                                        handleInputChange={this.handleInputChange}
                                        adminFalse={this.adminFalse}
                                        adminTrue={this.adminTrue}
                                        adminVal={this.state.admin}
                                    />
                                </div>
                            </div>
                        </div>
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
