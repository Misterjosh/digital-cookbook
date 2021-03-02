import React, { Component } from 'react';
import { userOptions } from "./userOptions";
import './userPageMenu.css';


class UserOptions extends Component {

    render() {
        return(
            <div className="userItems">
                <h1><span className="red-span">What would you like to do?</span></h1>
                
                <ul className="ul-fun">
                    {userOptions.map((item, index) => {
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

export default UserOptions;