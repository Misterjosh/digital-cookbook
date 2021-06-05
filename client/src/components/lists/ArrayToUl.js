import React, { Component } from 'react'

export default class ArrayToUl extends Component {
    render() {
        let arrayVal = this.props.listVal;
        return (
            <div className="row">
                <div>
                    <ul>
                        {arrayVal ? arrayVal.map((item, index) => (
                                    <li key={index}>{item}</li>
                                )) : "Loading..."}
                    </ul>
                </div>
            </div>
        )
    }
}
