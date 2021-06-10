import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeCard from '../components/recipeCard/RecipeCard';

export default class recipeView extends Component {
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
                    <div className="row">  
                        <div className="col-3"></div>
                        <div className="col-6" style={{textAlign:"center"}}>
                            <div className="row">
                                <div className="col-2">
                                    <button className="btn submit-btn btn-warning">Edit Recipe</button>
                                </div>
                                <div className="col-3">
                                    <button className="btn submit-btn btn-danger">Delete Recipe</button>
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