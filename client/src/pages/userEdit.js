import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import EditUser from '../components/editUser/EditUser';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import jwt_decode from 'jwt-decode';

// Uses state to make the forms work right
class userEdit extends Component {
    state = {
        loading: true,
        person: null,
        fName: "",
        lName: "",
        email: "",
        password: "",
        message: ""
    };

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
                        password: user.data.password
                    };
            // password is not set in state to avoid showing the curent and fully hashed password as you can't unhash it
            this.setState({ person: userData, loading: false, fName: user.data.name.first, lName: user.data.name.last, email: user.data.email });
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
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.person.lName
                },
                email: this.state.person.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 0010 if only email has a value, other values set to original
        if (this.state.fName === "" && this.state.lName === "" && this.state.email !== "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 0011 if email and password have a new values, other values set to original
        if (this.state.fName === "" && this.state.lName === "" && this.state.email !== "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 0100 if only last name has a value, other values set to original
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email === "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 0101 if last name and password have new values, other values set to original
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email === "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 0110 if last name and email have new values, other values set to original
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email !== "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 0111 if first name is blank it will be set to its default value
        if (this.state.fName === "" && this.state.lName !== "" && this.state.email !== "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.person.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1000 if only first name has a value, other values set to original
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email === "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.person.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1001 if last name and email are blank, the rest will be set to default values
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email === "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.person.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1010 if last name and password are blank, the rest will be set to default values
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email !== "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1011 if last name is blank, it will be set to its default value
        if (this.state.fName !== "" && this.state.lName === "" && this.state.email !== "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.person.lName
                },
                email: this.state.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1100 if email and password are blank, they will be set to their default values
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email === "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1101 if email is blank, it will be set to its default value
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email === "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.person.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1110 if password is blank, it will be set to its default value
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email !== "" && this.state.password === "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.person.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

        // 1111 no are blank, then we use all the new info
        if (this.state.fName !== "" && this.state.lName !== "" && this.state.email !== "" && this.state.password !== "") {
            let editData = {
                name: {
                    first: this.state.fName,
                    last: this.state.lName
                },
                email: this.state.email,
                password: this.state.password
            }
            this.setState({ message: "" });
            
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            console.log(editData);
            console.log(userId);
            // API.updateUser({ params: { id: userId, userData: editData } })
            //     .then(window.location.replace("/user/view"))
            //     .catch((err) => console.log(err))
        }

    };

    render() {
        const goHome = () => {
            window.location.replace("/")
        };
        if (localStorage.getItem('dcb-jwt')) {
            return (
                <div>
                    {this.state.loading || !this.state.person ? (
                    <div> loading ...</div>
                    ) : (
                    <div>
                        <div style={{textAlign:"center"}}>
                            <NavbarComp />
                                <div>
                                    <h1><span className="red-span">Edit Your Profile Here</span></h1>
                                        <EditUser 
                                                fName={this.state.fName}
                                                lName={this.state.lName}
                                                email={this.state.email}
                                                password={this.state.password}
                                                handleInputChange={this.handleInputChange}
                                                onSubmit={this.onSubmit}
                                        />
                                        <div>{this.state.message}</div>
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
