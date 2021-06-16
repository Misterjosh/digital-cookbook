import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeCard from '../components/recipeCard/RecipeCard';

export default class recipeView extends Component {
    state = {
        recipe: {},
        recipeId: '',
        message: ''
    };

    async componentDidMount() {
        const recipeId = localStorage.getItem("current-recipe");
        await API.getRecipeInfo(recipeId)
            .then((oneRecipe) => {
                this.setState({ recipe: oneRecipe.data, recipeId: recipeId });
                console.log(this.state.recipe);
            })
            .catch((error) => console.log(error));
    }

    onEditClick = () => {
        window.location.replace("/recipe/edit");
    }

    onDeleteClick = (idToDelete) => {
        if (this.state.message === "") {
            this.setState({ message: "Warning! Click the Delete button again to irreversibly delete this recipe."})
        } else {
            API.deleteRecipe(idToDelete)
            .then(() => {                    
            this.setState({ message: "" });
            localStorage.removeItem('current-recipe');
            window.location.replace("/recipes/view");
            })
        }
    }

    render() {
        const goHome = () => {
            window.location.replace("/")
        };
        if (localStorage.getItem('dcb-jwt') && localStorage.getItem('current-recipe') ) {
            return (
                <div style={{overflow: "hidden"}}>
                    <NavbarComp />
                    <div style={{paddingTop: "5rem", paddingBottom: "1rem"}}>
                        <RecipeCard recipe={this.state.recipe} />
                    </div>
                    <div style={{paddingBottom: "5rem"}}>
                        <div style={{textAlign: "center", overflow: "hidden"}}>
                            <button className="btn submit-btn btn-warning" onClick={() => this.onEditClick()}>Edit Recipe</button><br />
                            <h1 style={{paddingTop: "1rem"}}><span className="red-span">{this.state.message}</span></h1>
                            <button className="btn submit-btn btn-danger" onClick={() => this.onDeleteClick(this.state.recipeId)}>Delete Recipe</button>
                        </div>
                    </div>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}