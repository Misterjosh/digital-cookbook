import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeCard from '../components/recipeCard/RecipeCard';
import jwt_decode from 'jwt-decode';

export default class recipeEdit extends Component {

    state = {
        recipe: null,
        message: '',
        loading: true,
        name: '',
        source: '',
        servings: '',
        ingredients: [],
        instructions: [],
        ingList: [],
        ingVal: '',
        instList: [],
        instVal: '',
        newName: '',
        newSource: '',
        newServings: '',
        recipeId: ''
    };

// get recipe info on load and store it for use by recipe card
    async componentDidMount() {
        const recipeId = localStorage.getItem("current-recipe");
        await API.getRecipeInfo(recipeId)
            .then((oneRecipe) => {
                this.setState({ recipe: oneRecipe.data, loading: false, recipeId: recipeId });
                console.log(this.state.recipe);
            })
            .catch((error) => console.log(error));
    }

// On changes for each input
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
      };

// Ingredients array add and delete functions
    onAddIng = () => {
      this.setState(state => {
      const ingList = state.ingList.concat({value: state.ingVal});
  
        return {
          ingList,
          ingVal: ''
        }
      });
    };
    
    onDeleteIng = i => {
      this.setState(state => {
      const ingList = state.ingList.filter((item, j) => i !== j);
  
        return {
          ingList
        }
      });
    };

// Instructions Array add and delete functions
    onAddInst = () => {
      this.setState(state => {
      const instList = state.instList.concat({value: state.instVal});
  
        return {
          instList,
          instVal: ''
        }
      });
    };
    
    onDeleteInst = i => {
      this.setState(state => {
      const instList = state.instList.filter((item, j) => i !== j);
      console.log("Item Deleted");
  
        return {
          instList
        }
      });
    };

// Submit and all 32 of the ways the recipe could be edited...
onSubmit = (event) => {
    event.preventDefault();
    console.log("Button was pressed");
    // if there is a message, clear it
    this.setState({ message: "" });
    // if no changes were made, do nothing and let the user know why
    if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
        this.setState({ message: "With no changes made, no changes were submitted." });
        return;

    } else {
        const updatedRecipe = {
            name: '',
            source: '',
            servings: '',
            ingredients: this.state.recipe.ingredients,
            instructions: this.state.recipe.instructions,
            author: this.state.recipe.author,
            authorId: this.state.recipe.authorId
        };
        if (this.state.newName === '') {
            updatedRecipe.name = this.state.recipe.name
        } else {
            updatedRecipe.name = this.state.newName
        }
        if (this.state.newSource === '') {
            updatedRecipe.source = this.state.recipe.source
        } else {
            updatedRecipe.source = this.state.newSource
        }
        if (this.state.newServings === '') {
            updatedRecipe.servings = this.state.recipe.servings
        } else {
            updatedRecipe.servings = this.state.newServings
        }
        if (this.state.ingList.length > 0 ) {
            updatedRecipe.ingredients = this.state.ingList
        }
        if (this.state.instList.length > 0) {
            updatedRecipe.instructions = this.state.instList
        }
            
            this.setState({ message: ""});
    
            API.updateRecipe(this.state.recipeId, updatedRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }
    }

// displays current recipe values on one card while displaying the edit options on the other
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
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div>
                    {this.state.loading || !this.state.recipe ? (
                    <div> loading ...</div>
                    ) : (
                    <div style={{overflow: "hidden"}}>
                        <NavbarComp />
                        <div className="row" style={{paddingBottom: "1rem", textAlign:"center", paddingTop: "5rem"}}><h1><span className="red-span">Edit Your Recipe</span></h1><br /></div>
                        <div className="row">
                            <div className="col-lg-5 col-sm-12">
                                <h1 style={{textAlign:"center"}}><span className="red-span">Current Recipe: </span></h1><br />
                                <RecipeCard recipe={this.state.recipe}/><br />
                            </div>
                            <form className="col-lg-5 col-sm-12">    
                                <h1 style={{textAlign: "center"}}><span className="red-span">What would you like to change?</span></h1>
                                <div className="container" style={{marginTop: "2rem", backgroundColor: "white"}}>

                                    <div style={{marginTop: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <h3>Recipe Name: </h3>
                                        <input type="text" name="newName" value={this.state.newName} onChange={this.handleInputChange} />
                                    </div>

                                    <div style={{marginTop: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <h3>Source: </h3>
                                        <input type="text" name="newSource" value={this.state.newSource} onChange={this.handleInputChange} />
                                    </div>

                                    <div style={{marginTop: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <h3>Number of Servings: </h3>
                                        <input type="text" name="newServings" value={this.state.newServings} onChange={this.handleInputChange} />
                                        <div className="row" style={{padding: "1rem"}}>
                                            <div className="col">
                                                <h5>Shows up as: This makes <span style={{backgroundColor: "lightblue"}}>{this.state.newServings}</span> servings.</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{marginTop: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <h3>Ingredients: </h3>
                                        <ul>
                                            {(this.state.ingList).map((item, index) => (
                                                <li key={item.id}>{item.value} 
                                                    <button className="btn btn-danger btn-sm" onClick={() => this.onDeleteIng(index)}>x</button>
                                                </li>
                                            ))}
                                        </ul>

                                        <input 
                                        type="text"
                                        name="ingVal"
                                        value={this.state.ingVal}
                                        onChange={this.handleInputChange}
                                        />

                                        <button
                                        type="button"
                                        onClick={this.onAddIng}
                                        disabled={!this.state.ingVal}
                                        className="btn submit-btn btn-success"
                                        >
                                        Add
                                        </button>
                                    </div>

                                    <div style={{marginTop: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <h3>Instructions: </h3>
                                        <ul>
                                            {(this.state.instList).map((item, index) => (
                                                <li key={item.id}>{item.value} 
                                                    <button className="btn btn-danger btn-sm" onClick={() => this.onDeleteInst(index)}>x</button>
                                                </li>
                                            ))}
                                        </ul>

                                        <input 
                                        type="text"
                                        name="instVal"
                                        value={this.state.instVal}
                                        onChange={this.handleInputChange}
                                        />

                                        <button
                                        type="button"
                                        onClick={this.onAddInst}
                                        disabled={!this.state.instVal}
                                        className="btn submit-btn btn-success"
                                        >
                                        Add
                                        </button>
                                    </div>

                                    <div style={{marginTop: "0", paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <h1><span className="red-span">{this.state.message}</span></h1>
                                    </div>

                                    <button style={{paddingBottom: "0.5rem"}} onClick={this.onSubmit} className="btn submit-btn btn-primary"><i className="fas fa-plus"></i> Submit Changes</button>

                                </div>
                            </form>
                            <div className="col-1"></div>
                        </div>
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