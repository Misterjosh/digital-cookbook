import React, { Component } from 'react';
import ArrayToUl from '../../components/lists/ArrayToUl';

export default class RecipeCard extends Component {
    render() {
        let info = this.props.recipe;
        return (
            <div className="row">
                
                <div className="col-3"></div>
                <div className="col-6" style={{backgroundColor:'white', flexDirection: 'row', marginTop: '5rem', marginBottom: '2rem'}}>
                    <h1 style={{marginTop: "1rem"}}><span>{info.name}</span></h1><br />
                    <h3><span>Submitted by {info.author}</span></h3><br />
                    <h4><span style={{flex: 1, flexwrap: 'wrap'}}>From: {info.source}</span></h4><br />
                    <h4><span>This recipe {info.servings}</span></h4><br />
                    <h4><span>Ingredients: </span><br />
                        <span><ArrayToUl listVal={info.ingredients} /></span></h4><br />
                    <h4><span>Instructions: </span><br />
                        <span><ArrayToUl listVal={info.instructions} /></span></h4><br />
                </div>
                <div className="col-3"></div>
                
            </div>
        )
    }
}



