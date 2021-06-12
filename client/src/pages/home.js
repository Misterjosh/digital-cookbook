import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import LogIn from '../components/loginForm/LoginForm';
import Footer from '../components/footer/Footer';
import API from '../utils/api';

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
            .catch((err) => console.log(err))

    };

    render() {
        if (!localStorage.getItem('dcb-jwt')) {
            return (
                <div style={{textAlign:"center"}}>
                    <NavbarComp />
                    <div style={{paddingTop: "5rem", paddingBottom: "5rem"}} className="home">
                        <h1><span className="red-span">Welcome to Digital Cookbook</span></h1>
                        <h3><span className="red-span">Please log in or </span><a className="blue-link" href="/signup">sign up</a></h3>
                        <div>{this.state.message}</div>
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
