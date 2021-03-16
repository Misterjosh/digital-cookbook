import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar.js';
import LogIn from '../components/loginForm/loginForm';
import Footer from '../components/footer/footer';
import API from '../utils/api';

// Uses state to make the forms work right
class Home extends Component {
    state = {
        email: "",
        password: "",
        userInfo: {}
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
        if (this.state.email === "" || this.state.password === "") {
            return;
        }
        this.userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(this.userInfo);
        // return this.userInfo;
        API.logIn(this.userInfo)
            .then(function (jwt) {
                // console.log(response.data.token)
                localStorage.setItem('jwt', jwt.data.token)
                window.location.replace("/user")
            })
            .catch((err) => console.log(err))

    };

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <Navbar />
                <div className="home">
                    <h1><span className="red-span">Welcome to Digital Cookbook</span></h1>
                    <h3><span className="red-span">Please log in or </span><a className="blue-link" href="/signup">sign up</a></h3>
                    <LogIn
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

export default Home;
