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
        const delUser = () => {
            if (this.state.message === "") {
                this.setState({ message: "Warning! There is no going back. Click button again to delete your profile."})
            } else {
                API.deleteUser( this.state.currentId )
                .then(() => {                    
                this.setState({ message: "" });
                localStorage.removeItem('dcb-jwt');
                window.location.replace("/");
                })
            }
        };
        if (localStorage.getItem('dcb-jwt')) {
            return (
                <div>
                    <div>
                        <div style={{textAlign:"center"}}>
                            <NavbarComp />
                            <h1><span className="red-span">Profile Details for</span></h1><br />
                            <div><h1><span className="red-span">{this.state.message}</span></h1></div>
                            <button onClick={delUser}>Delete Profile</button>
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