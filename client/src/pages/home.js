import React, { Component } from 'react';
import Navbar from '../components/navbar/navbar.js';
import LogIn from '../components/loginForm/loginForm';
import Footer from '../components/footer/footer';
// import API from '../utils/api';

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

    render() {
        return (
            <div style={{textAlign:"center"}}>
                <Navbar />
                <div className="home">
                    <h1>Welcome to Digital Cookbook</h1>
                    <h3>Please log in or <a href="/signup">sign up</a></h3>
                    <LogIn
                        email={this.state.email}
                        password={this.state.password}
                        handleInputChange={this.handleInputChange}
                        // onSubmit={this.onSubmit}
                    />
                </div>
                <Footer />
            </div>
        )
    }

}

export default Home;
