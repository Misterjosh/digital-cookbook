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

    onDeleteClick = (idToDelete) => {
        if (this.state.message === "") {
            this.setState({ message: "Warning! There is no going back. Click the Delete Recipe button again to delete this recipe."})
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
                <div>
                    <NavbarComp />
                    <RecipeCard recipe={this.state.recipe} />
                    <div className="row">  
                        <div className="col-3"></div>
                        <div className="col-6" style={{textAlign:"center"}}>
                            <h1><span className="red-span">{this.state.message}</span></h1>
                            <div className="row">
                                <div className="col-2">
                                    <button className="btn submit-btn btn-warning">Edit Recipe</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn submit-btn btn-danger" onClick={() => this.onDeleteClick(this.state.recipeId)}>Delete Recipe</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        
                    </div>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}