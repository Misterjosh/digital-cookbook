import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import LogIn from '../components/loginForm/LoginForm';
import Footer from '../components/footer/Footer.js';
import API from '../utils/api';
import jwt_decode from 'jwt-decode';

// Uses state to make the forms work right
class Home extends Component {
    state = {
        email: "",
        password: "",
        userInfo: {},
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
        // clear any extra items left from previous session
        localStorage.removeItem('current-recipe');
        localStorage.removeItem('admin-id-user');
        localStorage.removeItem('admin--recipe');
        if (this.state.email === "" || this.state.password === "") {
            this.setState({ message: "Both inputs need a value!"});
            return;
        } else
        this.setState({ message: ""});
        this.userInfo = {
            email: this.state.email,
            password: this.state.password
        }
        
        API.logIn(this.userInfo)
            .then(function (jwt) {
                localStorage.setItem('dcb-jwt', jwt.data.token)
                window.location.replace("/recipes/view")
            })
            .catch((err) => {
                console.log(err.response.status);
                if (err.response.status === 404) {
                    this.setState({
                        email: '',
                        password: '',
                        message: "That email address is not registered"
                    })
                } else {
                    this.setState({
                        password: '',
                        message: "That password is incorrect"
                    })
                }
            })
    };

    render() {
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
        if (!localStorage.getItem('dcb-jwt') || checkExp() === false) {
            return (
                <div style={{textAlign:"center"}}>
                    <NavbarComp />
                    <div style={{paddingTop: "5rem", paddingBottom: "5rem"}} className="home">
                        <h1><span className="red-span">Welcome to Digital Cookbook</span></h1>
                        <h3><span className="red-span">Please Log In or </span><a className="blue-link" href="/signup">Create an Account</a></h3>
                        <h2 className="red-span">{this.state.message}</h2>
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
        } else {
            return (
                <div style={{textAlign:"center"}}>
                    <NavbarComp />
                    <div style={{paddingTop: "5rem", paddingBottom: "5rem"}} className="home">
                        <h1><span className="red-span">Welcome Back!</span></h1>
                        <h1><span className="red-span">Please use the navbar to reach your destination</span></h1>
                    </div>
                    <Footer />
                </div>
            ) 
        }

    }

}

export default Home;
