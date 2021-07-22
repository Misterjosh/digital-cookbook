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
        password: "",
        message: "",
        id: ""
    };

    async componentDidMount() {
        const idToEdit = window.localStorage.getItem('admin-id-user');
        const token = window.localStorage.getItem('dcb-jwt');
        const noBearer = token.replace(/Bearer token: /, '');
        const decoded = jwt_decode(noBearer);
        const validated = decoded.tonyDanza;
        await API.getUserInfo({ params: { id: idToEdit } })
            .then((user) => {
                let userData = {
                    fName: user.data.name.first,
                    lName: user.data.name.last,
                    email: user.data.email,
                    admin: user.data.admin,
                    password: user.data.password
                };
                this.setState({ 
                    user: userData, 
                    validAdmin: validated, 
                    loading: false,
                    admin: user.data.admin,
                    currentEmail: user.data.email,
                    id: idToEdit
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
        // if there is a message, clear it
        this.setState({ message: "" });
        // if no changes were made, do nothing and let the user know why
        if (this.state.fName === "" && this.state.lName === "" && this.state.email === "" && this.state.password === "" && this.state.user.admin === this.state.admin) {
            this.setState({ message: "With no changes made, no changes were submitted." });
            return;
        // changes are made but password isn't changed
        } else if (this.state.password === "") {
            const updatedUser = {
                name: {
                    first: "",
                    last: ""
                },
                email: "",
                admin: this.state.admin,
                password: this.state.user.password,
                current: this.state.user.email
    
            };
            if (this.state.fName === "") {
                updatedUser.name.first = this.state.user.fName;
            } else {
                updatedUser.name.first = this.state.fName
            };
            if (this.state.lName === "") {
                updatedUser.name.last = this.state.user.lName;
            } else {
                updatedUser.name.last = this.state.lName;
            };
            if (this.state.email === "") {
                updatedUser.email = this.state.user.email;
            } else {
                updatedUser.email = this.state.email;
            };

            API.updateUserNoPass(this.state.id, updatedUser)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Profile Updated!") {setTimeout(() => {
                    window.location.replace("/admin/users")
                }, 1800);};
            })
            .catch((err) => console.log(err))

        } else {
            // changes are made and password is changed
            const updatedUser = {
                name: {
                    first: "",
                    last: ""
                },
                email: "",
                admin: this.state.admin,
                password: this.state.password,
                current: this.state.user.email
    
            };
            if (this.state.fName === "") {
                updatedUser.name.first = this.state.user.fName;
            } else {
                updatedUser.name.first = this.state.fName
            };
            if (this.state.lName === "") {
                updatedUser.name.last = this.state.user.lName;
            } else {
                updatedUser.name.last = this.state.lName;
            };
            if (this.state.email === "") {
                updatedUser.email = this.state.user.email;
            } else {
                updatedUser.email = this.state.email;
            };

            API.updateUser(this.state.id, updatedUser)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Profile Updated!") {setTimeout(() => {
                    window.location.replace("/admin/users")
                }, 1800);};
            })
            .catch((err) => console.log(err))
        };
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
                                        admin={this.state.user.admin}
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
                        <h2 className="red-span" style={{textAlign: "center"}}>{this.state.message}</h2>
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
