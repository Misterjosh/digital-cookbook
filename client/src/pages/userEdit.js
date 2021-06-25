import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import EditUser from '../components/editUser/EditUser';
import Footer from '../components/footer/Footer';
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
        // 0000 if all fields are empty, the user will get a message and nothing will happen
        if (this.state.fName === "" && this.state.lName === "" && this.state.email === "" && this.state.password === "") {
            this.setState({ message: "At least one field should have a value" });
            return;
        }

        // 0001 if only password has a value, other values set to original
        if (this.state.fName === "" && this.state.lName === "" && this.state.email === "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.person.lName
                },
                email: this.state.person.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }
            // if the message was set, it needs cleared
            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 0010 if only email has a value, other values set to original
        if (this.state.fName === "" && this.state.lName === "" && this.state.email !== "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 0011 if email and password have a new values, other values set to original
        if (this.state.fName === "" && this.state.lName === "" && this.state.email !== "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 0100 if only last name has a value, other values set to original
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email === "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 0101 if last name and password have new values, other values set to original
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email === "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 0110 if last name and email have new values, other values set to original
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email !== "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 0111 if first name is blank it will be set to its default value
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email !== "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 1000 if only first name has a value, other values set to original
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email === "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.person.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 1001 if last name and email are blank, the rest will be set to default values
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email === "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.person.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 1010 if last name and password are blank, the rest will be set to default values
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email !== "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 1011 if last name is blank, it will be set to its default value
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email !== "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 1100 if email and password are blank, they will be set to their default values
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email === "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log(err))
        }

        // 1101 if email is blank, it will be set to its default value
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email === "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log("Catch" + err))
        }

        // 1110 if password is blank, it will be set to its default value
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email !== "" && this.state.password === "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.person.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUserNoPass(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log("Catch" + err))
        }

        // 1111 no are blank, then we use all the new info
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email !== "" && this.state.password !== "") {

            const editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.password,
                current: this.state.person.email,
                admin: this.state.person.admin
            }

            this.setState({ message: "" });

            API.updateUser(this.state.id, editData)
                .then((response) => {
                    this.setState({ message: response.data });
                    if (this.state.message === "Profile Updated!") {setTimeout(() => {
                        window.location.replace("/user/view")
                    }, 1800);};
                })
                .catch((err) => console.log("Catch" + err))
        }

    };

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
                        <div style={{textAlign:"center"}}>
                            <NavbarComp />
                                <div style={{paddingTop: "5rem", paddingBottom: "5rem"}}>
                                    <h1><span className="red-span">Your Account Details</span></h1><br />
                                        <UserView 
                                            first={this.state.person.fName} 
                                            last={this.state.person.lName} 
                                            email={this.state.person.email} 
                                            created={this.state.person.created} 
                                            updated={this.state.person.updated}
                                            admin={(`${this.state.person.admin}`.toUpperCase())} 
                                        /><br />
                                    <h1><span className="red-span">What would you like to change?</span></h1>
                                        <EditUser 
                                                fName={this.state.fName}
                                                lName={this.state.lName}
                                                email={this.state.email}
                                                password={this.state.password}
                                                handleInputChange={this.handleInputChange}
                                                onSubmit={this.onSubmit}
                                        /><br />
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
