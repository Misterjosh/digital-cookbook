import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar.js';
import SignupForm from '../components/signupForm/signupForm';
import Footer from '../components/footer/footer';
import API from '../utils/api';

// Uses state to make the forms work right
class Signup extends Component {
    state = {
        fName: "",
        lName: "",
        email: "",
        password: "",
        userData: {}
    };

    // This deals with each change from a value on the form
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        if (this.state.fName === "" || this.state.lName === "" || this.state.email === "" || this.state.password === "") {
            return;
        }
        this.userData = {
            name: {
                first: this.state.fName,
                last: this.state.lName
            },
            email: this.state.email,
            password: this.state.password
        }
        
        API.createUser(this.userData)
            .then(window.location.replace("/"))
            .catch((err) => console.log(err))

    };

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <Navbar />
                    <div>
                        <h2>Please Create Your Profile Here or <a href="/">Login</a></h2>
                            <SignupForm 
                                    fName={this.state.fName}
                                    lName={this.state.lName}
                                    email={this.state.email}
                                    password={this.state.password}
                                    handleInputChange={this.handleInputChange}
                                    onSubmit={this.onSubmit}
                            />
                    </div>    
                <Footer />
            </div>
        )
    }
}

export default Signup;