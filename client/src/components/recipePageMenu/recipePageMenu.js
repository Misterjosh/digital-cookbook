import React, { Component } from 'react';
import { recipeOptions } from "./recipeOptions";
import './recipePageMenu.css';


class RecipeOptions extends Component {

    render() {
        return(
            <div className="recipeItems">
                <h1><span className="red-span">What would you like to do?</span></h1>
                
                <ul className="ul-fun">
                    {recipeOptions.map((item, index) => {
                        return (
                            <li key={index}>
                                <button className={item.cName}><a href={item.url}><span>{item.title}</span></a></button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default RecipeOptions;