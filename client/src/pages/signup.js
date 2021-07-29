import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import SignupForm from '../components/signupForm/signupForm';
import Footer from '../components/footer/Footer.js';
import API from '../utils/api';

class Signup extends Component {
    state = {
        fName: "",
        lName: "",
        email: "",
        password: "",
        message: ""
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
        // If the user has an empty field, tell them and do nothing
        if (this.state.fName === "" || this.state.lName === "" || this.state.email === "" || this.state.password === "") {
            this.setState({ message: "All inputs need a value!"});
            return;
        }
        // If the fields all have a value, make sure the message is cleared, create a user from the inputs, and make an api call
        this.setState({ message: ""});
        const newUser = {
            name: {
                first: this.state.fName,
                last: this.state.lName
            },
            email: this.state.email,
            password: this.state.password
        }
        
        API.createUser(newUser)
            .then(window.location.replace("/"))
            .catch((err) => console.log(err))

    };

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <NavbarComp />
                    <div style={{paddingTop: "5rem", paddingBottom: "5rem"}}>
                        <h1><span className="red-span">Create Your Account Here</span></h1>
                        <h3><span className="red-span">or </span><a className="blue-link" href="/">Login</a></h3>
                        <div>{this.state.message}</div>
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