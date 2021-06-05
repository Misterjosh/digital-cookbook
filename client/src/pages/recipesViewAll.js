import React from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import RecipeButtons from '../components/lists/RecipeButtons';

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
        
        if (localStorage.getItem('dcb-jwt')) {
            return (
                <div style={{textAlign:"center"}}>
                    <NavbarComp />
                    <h1><span className="red-span">Choose any Recipe to view</span></h1>
                    <RecipeButtons listVal={this.state.recipes} click={this.stickAndMove}/>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
        
    }
}
