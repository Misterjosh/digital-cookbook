import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import jwt_decode from 'jwt-decode';

export default class userDelete extends React.Component {
    state = {
        message: "",
        currentId: null
    };

    async componentDidMount() {
        if (localStorage.getItem('dcb-jwt')) {
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            this.setState({ currentId: userId });
        }
        
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
        const delUser = () => {
            if (this.state.message === "") {
                this.setState({ message: "Warning! No going back. Click again to delete your Account."})
            } else {
                API.deleteUser( this.state.currentId )
                .then(() => {                    
                this.setState({ message: "" });
                localStorage.removeItem('dcb-jwt');
                window.location.replace("/");
                })
            }
        };
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div>
                    <div>
                        <div style={{textAlign:"center"}}>
                            <NavbarComp />
                            <h1 style={{paddingTop: "5rem"}}><span className="red-span">If you are sure, click the button below.</span></h1><br />
                            <div><h1><span className="red-span">{this.state.message}</span></h1></div>
                            <div style={{paddingBottom: "5rem"}}><button className="btn btn-danger submit-btn" onClick={delUser}><i class="fas fa-skull"></i> Delete Account</button></div>
                            <Footer />
                        </div>
                    </div>
                    )
                </div>
            )
        } else {
            goHome();
        }
    }
}