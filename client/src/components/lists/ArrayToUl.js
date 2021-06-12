import React, { Component } from 'react'

export default class ArrayToUl extends Component {
    render() {
        let arrayVal = this.props.listVal;
        return (
            <div className="row">
                <div>
                    <ul>
                        {arrayVal ? arrayVal.map((item) => (
                                    <li style={{ paddingTop: "1rem"}}key={item._id}>{item.value}</li>
                                )) : "Loading..."}
                    </ul>
                </div>
            </div>
        )
    }
}
