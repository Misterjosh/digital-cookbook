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
                        updated: user.data.updated
                    };
            this.setState({ person: userData, loading: false });
        })
            .catch((error) => console.log(error));
        }
        
    }

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
                                <h1 style={{paddingTop: "5rem"}}><span className="red-span">Profile Details for {this.state.person.fName} {this.state.person.lName}</span></h1><br />
                                <div style={{paddingBottom: "5rem"}}><UserView 
                                    first={this.state.person.fName} 
                                    last={this.state.person.lName} 
                                    email={this.state.person.email} 
                                    created={this.state.person.created} 
                                    updated={this.state.person.updated} 
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