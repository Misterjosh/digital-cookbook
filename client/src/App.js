import React from 'react';
import './styling/app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/home';
import Signup from './pages/signup';
import User from './pages/user';
import Recipe from './pages/recipe';

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/user" component={User} />
        <Route exact path="/recipe" component={Recipe} />
      </div>
    </Router>
  );
}

export default App;
