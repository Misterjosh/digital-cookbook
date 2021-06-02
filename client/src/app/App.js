import React from 'react';
import './app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Recipe from '../pages/recipe';
import RecipeCreate from '../pages/recipeCreate';
import RecipeView from '../pages/recipeView';
import RecipeViewAll from '../pages/recipesView';
import RecipesView from '../pages/recipesViewAll';
import RecipeDelete from '../pages/recipeDelete';
import UserView from '../pages/userView';
import UserEdit from '../pages/userEdit';
import UserDelete from '../pages/userDelete';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/recipe" component={Recipe} />
        <Route exact path="/recipe/create" component={RecipeCreate} />
        <Route exact path="/recipe/view" component={RecipeView} />
        <Route exact path="/recipes/view/user" component={RecipeViewAll} />
        <Route exact path="/recipes/view" component={RecipesView} />
        <Route exact path="/recipe/delete" component={RecipeDelete} />
        <Route exact path="/user/view" component={UserView} />
        <Route exact path="/user/edit" component={UserEdit} />
        <Route exact path="/user/delete" component={UserDelete} />
      </div>
    </Router>
  );
}

export default App;
