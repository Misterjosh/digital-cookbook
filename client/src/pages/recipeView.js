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
                    <div className="containter row-12 row-sm-12">
                    <div className="row-12 row-sm-12" style={{paddingTop: "5rem"}}><RecipeCard recipe={this.state.recipe} /></div>
                    <div className="row">  
                        <div className="row" style={{textAlign:"center"}}></div>
                            <h1><span className="red-span">{this.state.message}</span></h1>
                            <div style={{paddingBottom: "5rem"}}className="row">
                                <div className="col-3"></div>
                                <div className="col-3">
                                    <button className="btn submit-btn btn-warning" onClick={() => this.onEditClick()}>Edit Recipe</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn submit-btn btn-danger" onClick={() => this.onDeleteClick(this.state.recipeId)}>Delete Recipe</button>
                                </div>
                                <div className="col-3"></div>
                            </div>
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