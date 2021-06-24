import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeCard from '../components/recipeCard/RecipeCard';
import jwt_decode from 'jwt-decode';

export class recipe extends Component {
    state = {
        recipe: {}
    };

    async componentDidMount() {
        const recipeId = localStorage.getItem("current-recipe");
        await API.getRecipeInfo(recipeId)
            .then((oneRecipe) => {
                this.setState({ recipe: oneRecipe.data });
                console.log(this.state.recipe);
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
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div style={{overflow: "hidden"}}>
                    <NavbarComp />
                    <div style={{paddingTop: "6rem", paddingBottom: "5rem"}}>
                        <RecipeCard recipe={this.state.recipe} />
                    </div>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}

export default recipe;