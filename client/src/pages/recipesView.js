import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import Footer from '../components/footer/Footer.js';
import API from '../utils/api';
import jwt_decode from 'jwt-decode';
import RecipeButtons from '../components/lists/RecipeButtons';

export default class recipesView extends Component {
    state = {
        recipeList: [],
        message: ""
    };

    // get user id from token then get recipes submitted by user with that id
    async componentDidMount() {
        if (localStorage.getItem('dcb-jwt')) {
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            await API.getAllUserRecipes(userId)
                .then((recipeArray) => {
                    if (recipeArray.data.length === 0) {
                        this.setState({ message: "You currently have no recipes in the database."})
                    } else {
                        this.setState({ recipeList: recipeArray.data})
                        console.log(recipeArray.data);
                    }
        })
            .catch((error) => console.log(error));
        }
        
    }

    stickAndMove = (recId) => {
        window.localStorage.setItem("current-recipe", recId);
        window.location.replace("/recipe/view");
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
                <div style={{textAlign:"center", overflow: "hidden"}}>
                    <NavbarComp />
                    <h1 style={{paddingTop: "5rem"}}><span className="red-span">A list of your recipes</span></h1>
                    <div>{this.state.message}</div>
                    <div style={{paddingBottom: "5rem"}}>
                        <RecipeButtons listVal={this.state.recipeList} click={this.stickAndMove}/>
                    </div>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}
