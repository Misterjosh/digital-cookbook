import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeCard from '../components/recipeCard/RecipeCard';

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
        if (localStorage.getItem('dcb-jwt') ) {
            return (
                <div>
                    <NavbarComp />
                    <RecipeCard recipe={this.state.recipe} />
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}

export default recipe;