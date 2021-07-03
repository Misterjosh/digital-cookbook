import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import jwt_decode from 'jwt-decode';
import API from '../utils/api';
import AdminRecipesDisplay from '../components/admin/AdminRecipesDisplay';

export default class adminRecipesView extends Component {
    state = {
        recipes: [],
        validAdmin: true
    };

    async componentDidMount() {
        const token = window.localStorage.getItem('dcb-jwt');
        const noBearer = token.replace(/Bearer token: /, '');
        const decoded = jwt_decode(noBearer);
        const userId = `${decoded.id}`;
        await Promise.all([API.getAllRecipes(), API.getUserInfo({ params: { id: userId } })])
            .then(([allRecipes, userInfo]) => {
                this.setState({ recipes: allRecipes.data, validAdmin: userInfo.data.admin });
            })
            .catch((error) => console.log(error));
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
        const onDeleteClick = (idToDelete) => {
            API.deleteRecipe(idToDelete)
            .then(() => {
            window.location.replace("/admin/recipes");
            })
            .catch(error => console.log(error));
            console.log("Delete Button Clicked");
        }
        if (localStorage.getItem('dcb-jwt') && checkExp() === true && this.state.validAdmin === true) {
            return (
                <div>
                    <NavbarComp />
                    <h1 style={{paddingTop: "5rem", textAlign: "center"}}><span className="red-span">Admin Recipes Page</span></h1>
                    <AdminRecipesDisplay recArr={this.state.recipes} delClick={onDeleteClick} />
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}
