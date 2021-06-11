import React, { Component } from 'react';
import NavbarComp from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import API from '../utils/api';
import jwt_decode from 'jwt-decode';

export default class recipeCreate extends Component {

    state = {
        message: '',
        name: '',
        source: '',
        servings: '',
        instVal: '',
        ingVal: '',
        instList: [],
        ingList: [],
        author: '',
        authorId: ''
      };

// get user name and id to place in recipe object after setting their states with the values
      async componentDidMount() {
        if (localStorage.getItem('dcb-jwt')) {
            const token = window.localStorage.getItem('dcb-jwt');
            const noBearer = token.replace(/Bearer token: /, '');
            const decoded = jwt_decode(noBearer);
            const userId = `${decoded.id}`;
            await API.getUserInfo({ params: { id: userId } })
                .then((user) => {
                    this.setState({ author:  user.data.name.first + ' ' + user.data.name.last, authorId: userId})
        })
            .catch((error) => console.log(error));
        }
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

// Instructions Array adding and deleting functions
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

// submit function and error prevention
    onSubmit = (event) => {
      event.preventDefault();
      
      const recipeObj = {
        name: this.state.name,
        source: this.state.source,
        servings: this.state.servings,
        ingredients: this.state.ingList,
        instructions: this.state.instList,
        author: this.state.author,
        authorId: this.state.authorId
      }
      console.log(recipeObj);

      if (this.state.name !== '' && this.state.source !== '' && this.state.servings !== '' && this.state.ingList.length > 0 && this.state.instList.length > 0) {
        API.createRecipe(recipeObj)
        .then(window.location.replace("/recipes/view"))
        .catch((error) => console.log(error));
      } else {
        this.setState({ message: "All fields require a value to create a recipe!"});
        return;
      }
    }

// The rendered component
    render() {
        const goHome = () => {
            window.location.replace("/")
        };
        if (localStorage.getItem('dcb-jwt') ) {
            return (
                <div>
                    <NavbarComp />

                    <div className="container" style={{marginTop: "2rem"}}>

                      <div>
                        <h3>Recipe Name: </h3>
                        <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                      </div>

                      <div>
                        <h3>Source: </h3>
                        <input type="text" name="source" value={this.state.source} onChange={this.handleInputChange} />
                      </div>

                      <div>
                        <h3>Number of Servings: </h3>
                        <input type="text" name="servings" value={this.state.servings} onChange={this.handleInputChange} /> 
                        <span>Shows up as: </span>
                        <span style={{backgroundColor: "white"}}>This makes {this.state.servings} servings.</span>
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

                      <button onClick={this.onSubmit}>Submit Recipe</button>

                    </div>
                    <Footer />
                </div>
            )
        } else {
            goHome();
        }
    }
}
