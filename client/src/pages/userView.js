import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';
import UserView from '../components/userView/UserView';
import API from '../utils/api';

export default class userView extends React.Component {
    state = {
        loading: true,
        person: null
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
                        created: user.data.created,
                        updated: user.data.updated,
                        admin: `${user.data.admin}`
                    };
            this.setState({ person: userData, loading: false });
            console.log(this.state.person);
        })
            .catch((error) => console.log(error));
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
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div>
                    {this.state.loading || !this.state.person ? (
                    <div> loading ...</div>
                    ) : (
                        <div>
                            <div style={{textAlign:"center"}}>
                                <NavbarComp />
                                <h1 style={{paddingTop: "5rem"}}><span className="red-span">Account Details for {this.state.person.fName} {this.state.person.lName}</span></h1><br />
                                <div style={{paddingBottom: "5rem"}}>
                                    <UserView 
                                        first={this.state.person.fName} 
                                        last={this.state.person.lName} 
                                        email={this.state.person.email} 
                                        created={this.state.person.created} 
                                        updated={this.state.person.updated}
                                        admin={(`${this.state.person.admin}`.toUpperCase())}
                                /></div>
                                <Footer />
                            </div>
                        </div>
                    )}
                </div>
            )
        } else {
            goHome();
        }
        
    }
}