import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeCard from '../components/recipeCard/RecipeCard';

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
        newServings: ''
    };

// get recipe info on load and store it for use by recipe card
    async componentDidMount() {
        const recipeId = localStorage.getItem("current-recipe");
        await API.getRecipeInfo(recipeId)
            .then((oneRecipe) => {
                this.setState({ recipe: oneRecipe.data, loading: false });
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
      console.log(ingList);
  
        return {
          ingList,
          ingVal: ''
        }
      });
    };
    
    onDeleteIng = i => {
      this.setState(state => {
      const ingList = state.ingList.filter((item, j) => i !== j);
      console.log("Item Deleted");
  
        return {
          ingList
        }
      });
    };

// Instructions Array add and delete functions
    onAddInst = () => {
      this.setState(state => {
      const instList = state.instList.concat({value: state.instVal});
      console.log(instList);
  
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

        const recipeId = localStorage.getItem("current-recipe");

        // 00000
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            
                this.setState({ message: "No Update as no changes were made." });
                return;
        }

        // 00001
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 00010
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 00011
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 00100
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 00101
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 00110
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 00111
        if (this.state.newName === '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01000
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01001
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01010
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01011
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01100
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01101
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01110
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 01111
        if (this.state.newName === '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.recipe.name,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10000
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10001
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10010
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10011
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10100
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10101
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10110
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 10111
        if (this.state.newName !== '' && this.state.newSource === '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.recipe.source,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11000
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11001
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11010
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.ingredients,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11011
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings === '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.recipe.servings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11100
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11101
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length === 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.recipe.ingredients,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11110
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length === 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.recipe.instructions,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
            .then((response) => {
                this.setState({ message: response.data });
                if (this.state.message === "Recipe Updated!") {setTimeout(() => {
                    window.location.replace("/recipes/view/user")
                }, 1800);};
            })
            .catch(error => console.log(error));
        }

        // 11111
        if (this.state.newName !== '' && this.state.newSource !== '' && this.state.newServings !== '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
            const newRecipe = {
                name: this.state.newName,
                source: this.state.newSource,
                servings: this.state.newServings,
                ingredients: this.state.ingList,
                instructions: this.state.instList,
                author: this.state.recipe.author,
                authorId: this.state.recipe.authorId
            }
            
            this.setState({ message: ""});
    
            API.updateRecipe(recipeId, newRecipe)
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
        if (localStorage.getItem('dcb-jwt')) {
            return (
                <div>
                    {this.state.loading || !this.state.recipe ? (
                    <div> loading ...</div>
                    ) : (
                    <div>
                        <NavbarComp />
                        <h1 style={{textAlign:"center"}} ><span className="red-span">Edit Your Recipe</span></h1><br />
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-5">
                            <h2 style={{textAlign:"center"}}><span className="red-span">Current Recipe: </span></h2><br />
                                    <RecipeCard 
                                        recipe={this.state.recipe}
                                    /><br />
                            </div>
                            <div className="col-5">    
                            <h1><span className="red-span">What would you like to change?</span></h1>
                            <div className="container" style={{marginTop: "2rem", backgroundColor: "white"}}>

                                <div>
                                    <h3>Recipe Name: </h3>
                                    <input type="text" name="newName" value={this.state.newName} onChange={this.handleInputChange} />
                                </div>

                                <div>
                                    <h3>Source: </h3>
                                    <input type="text" name="newSource" value={this.state.newSource} onChange={this.handleInputChange} />
                                </div>

                                <div>
                                    <h3>Number of Servings: </h3>
                                    <input type="text" name="newServings" value={this.state.newServings} onChange={this.handleInputChange} /> 
                                    <span>Shows up as: </span>
                                    <span style={{backgroundColor: "yellow"}}>This makes {this.state.newServings} servings.</span>
                                </div>

                                <div>
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
                                    >
                                    Add
                                    </button>
                                </div>

                                <div>
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
                                    >
                                    Add
                                    </button>
                                </div>

                                <div>
                                    {this.state.message}
                                </div>

                                <button onClick={this.onSubmit}>Submit Changes</button>

                                </div>
                                    
                            </div>
                            <div className="col-1"></div>
                        </div>
                        <div><h2 style={{textAlign:"center"}}><span className="red-span">{this.state.message}</span></h2></div>
                        <Footer />
                    </div>
                    )}
                </div>
            )
        } 
        else {
            goHome();
        }
    }
}