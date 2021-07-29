import React from 'react';
import NavbarComp from '../components/navbar/Navbar.js';
import Footer from '../components/footer/Footer.js';
import API from '../utils/api';
import RecipeButtons from '../components/lists/RecipeButtons';
import jwt_decode from 'jwt-decode';

export default class recipesViewAll extends React.Component {
    state = {
        recipes: []
    };

    async componentDidMount() {
        await API.getAllRecipes()
            .then((allRecipes) => {
                this.setState({ recipes: allRecipes.data });
            })
            .catch((error) => console.log(error));
    }

    stickAndMove = (recId) => {
        window.localStorage.setItem("current-recipe", recId);
        window.location.replace("/recipe");
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
        if (localStorage.getItem('dcb-jwt') && checkExp() === true) {
            return (
                <div style={{textAlign:"center", overflow: "hidden"}}>
                    <NavbarComp />
                    <h1 style={{paddingTop: "5rem"}}><span className="red-span">Choose any Recipe to view</span></h1>
                    <div style={{paddingBottom: "5rem"}}><RecipeButtons listVal={this.state.recipes} click={this.stickAndMove}/></div>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
        
    }
}
