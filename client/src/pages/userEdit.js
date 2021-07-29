import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import EditUser from '../components/editUser/EditUser';
import Footer from '../components/footer/Footer.js';
import API from '../utils/api';
import jwt_decode from 'jwt-decode';
import UserView from '../components/userView/UserView';

// Uses state to make the forms work right
class userEdit extends Component {
    state = {
        loading: true,
        person: null,
        fName: "",
        lName: "",
        email: "",
        password: "",
        message: "",
        id: ""
    };

    // providing id and current user data
    async componentDidMount() {
        if (localStorage.getItem('dcb-jwt')) {
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            await API.getUserInfo({ params: { id: userId } })
                .then((user) => {
                    let userData = {
                        fName: user.data.name.first,
                        lName: user.data.name.last,
                        email: user.data.email,
                        password: user.data.password,
                        created: user.data.created,
                        updated: user.data.updated,
                        admin: user.data.admin
                    };
            // password is not set in state to avoid showing the curent and fully hashed password as you can't unhash it
            this.setState({ person: userData, loading: false, id: userId });
        })
            .catch((error) => console.log(error));
        }
        
    }

    // This deals with each change from a value on the form
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // update is taken care of on server side
    onSubmit = event => {
        event.preventDefault();
        // if there is a message, clear it
        this.setState({ message: "" });
        // if no changes were made, do nothing and let the user know why
        if (this.state.fName === "" && this.state.lName === "" && this.state.email === "" && this.state.password === "") {
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
                admin: this.state.person.admin,
                password: this.state.person.password,
                current: this.state.person.email
    
            };
            if (this.state.fName === "") {
                updatedUser.name.first = this.state.person.fName;
            } else {
                updatedUser.name.first = this.state.fName
            };
            if (this.state.lName === "") {
                updatedUser.name.last = this.state.person.lName;
            } else {
                updatedUser.name.last = this.state.lName;
            };
            if (this.state.email === "") {
                updatedUser.email = this.state.person.email;
            } else {
                updatedUser.email = this.state.email;
            };

            API.updateUserNoPass(this.state.id, updatedUser)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Profile Updated!") {setTimeout(() => {
                    window.location.replace("/user/view")
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
                admin: this.state.person.admin,
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
                    window.location.replace("/user/view")
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
                    {this.state.loading || !this.state.person ? (
                    <div> loading ...</div>
                    ) : (
                    <div>
                        <div>
                            <NavbarComp />
                                <div className="container" style={{paddingTop: "5rem", paddingBottom: "5rem"}}>
                                    <h1 className="red-span" style={{textAlign: "center", paddingBottom: "2rem"}}><span>Manage Your Account Details</span></h1>
                                    <div className="row">
                                        <div className="col col-lg-6 col-sm-12" style={{textAlign:"center"}}>
                                        <h2><span className="red-span">Your Account Details</span></h2><br />
                                            <UserView 
                                                first={this.state.person.fName} 
                                                last={this.state.person.lName} 
                                                email={this.state.person.email} 
                                                created={this.state.person.created} 
                                                updated={this.state.person.updated}
                                                admin={(`${this.state.person.admin}`.toUpperCase())} 
                                            />
                                        </div>
                                        <div className="col col-lg-6 col-sm-12" style={{textAlign:"center"}}>
                                        <h2><span className="red-span">What would you like to change?</span></h2>
                                            <EditUser 
                                                    fName={this.state.fName}
                                                    lName={this.state.lName}
                                                    email={this.state.email}
                                                    password={this.state.password}
                                                    handleInputChange={this.handleInputChange}
                                                    onSubmit={this.onSubmit}
                                            />
                                        </div>
                                    </div>
                                    <div><h2><span className="red-span">{this.state.message}</span></h2></div>
                                </div>    
                            <Footer />
                        </div>
                    </div>
                    )}
                </div>
            )
        } 
        else {
            goHome();
        }
    }
}

export default userEdit;
