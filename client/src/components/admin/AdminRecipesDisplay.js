import React, { Component } from 'react'

export default class AdminRecipesDisplay extends Component {
    render() {
        const recipesArray = this.props.recArr;
        return (
            <div className="container" style={{paddingTop: "1%", paddingBottom: "1%", margin: "0 auto", justifyContent: "center", overflow: "hidden", marginBottom: "10%"}}>
                {recipesArray.map((recipe, click) => (
                    <div className="child card" key={recipe._id} style={{marginTop: "1rem", display: "inline-block", marginRight: "1rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">Recipe Name: {recipe.name}</h5>
                            <h6 className="card-subtitle mb-2">Author: {recipe.author}</h6>
                            <button className="btn submit-btn btn-warning" onClick={() => this.props.editClick(recipe._id)}><i className="fas fa-edit"></i> Edit</button>
                            <button className="btn submit-btn btn-danger" onClick={() => this.props.delClick(recipe._id)}><i className="fas fa-trash-alt"></i> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

