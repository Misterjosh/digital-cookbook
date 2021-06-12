import React, { Component } from 'react';
import ArrayToUl from '../../components/lists/ArrayToUl';

export default class RecipeCard extends Component {
    render() {
        let info = this.props.recipe;
        return (
            <div className="row">
                
                <div className="col-3 col-sm-1"></div>
                <div className="col-6 col-sm-10" style={{backgroundColor:'white', paddingBottom: '2rem'}}>
                    <h1 style={{paddingTop: "1rem"}}><span>{info.name}</span></h1><br />
                    <h3><span>Submitted by {info.author}</span></h3><br />
                    <h4><span style={{wordWrap: "break-word"}}>From: {info.source}</span></h4><br />
                    <h4><span>This makes {info.servings} servings</span></h4><br />
                    <h4><span>Ingredients: </span><br />
                        <span><ArrayToUl listVal={info.ingredients} /></span></h4><br />
                    <h4><span>Instructions: </span><br />
                        <span><ArrayToUl listVal={info.instructions} /></span></h4><br />
                </div>
                <div className="col-3 col-sm-1"></div>
                
            </div>
        )
    }
}



