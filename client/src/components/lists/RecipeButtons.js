import React, { Component } from 'react';

export default class RecipeButtons extends Component {
    render() {
        let arrayVal = this.props.listVal;
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                            {arrayVal.map((item, click, index) => (
                                <div style={{textAlign: "left"}}><button key={item._id} onClick={ () => this.props.click(item._id)}>{item.name}</button></div>
                            ))}
                </div>
                <div className="col-3"></div>
            </div>
        )
    }
}
