import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import Footer from '../components/footer/Footer.js';
import jwt_decode from 'jwt-decode';
import API from '../utils/api';
import AdminRecipesDisplay from '../components/admin/AdminRecipesDisplay';

export default class adminRecipesView extends Component {
    state = {
        recipes: [],
        validAdmin: true,
        loading: true
    };

    async componentDidMount() {
        const token = window.localStorage.getItem('dcb-jwt');
        const noBearer = token.replace(/Bearer token: /, '');
        const decoded = jwt_decode(noBearer);
        const validated = decoded.tonyDanza;
        await API.getAllRecipes()
            .then((allRecipes) => {
                this.setState({ 
                    recipes: allRecipes.data, 
                    validAdmin: validated,
                    loading: false 
                });
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
                return false;
            } else {
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
        const onEditClick = (idToEdit) => {
            window.localStorage.setItem('admin-id-recipe', idToEdit);
            window.location.replace('/admin/edit/recipe');
        }
        if (localStorage.getItem('dcb-jwt') && checkExp() === true && this.state.validAdmin === true) {
            return (
                <div>
                    {this.state.loading || !this.state.recipes ? (
                    <div> loading ...</div>
                    ) : (
                    <div>
                        <NavbarComp />
                        <h1 style={{paddingTop: "5rem", textAlign: "center"}}><span className="red-span">Admin Recipes Page</span></h1>
                        <AdminRecipesDisplay recArr={this.state.recipes} delClick={onDeleteClick} editClick={onEditClick}/>
                        <Footer />
                    </div>
                    )}
                </div>
            )
        } else {
            goHome();
        }
    }
}
