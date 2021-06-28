import React, { Component } from 'react'

export default class adminUsersDisplay extends Component {
    render() {
        const usersArray = this.props.arrUsers;
        return (
            <div className="container" style={{paddingTop: "1%", paddingBottom: "1%", margin: "0 auto", justifyContent: "center", overflow: "hidden", marginBottom: "10%"}}>
                {usersArray.map((user, click) => (
                    <div className="child" key={user._id} class="card" style={{marginTop: "1rem", display: "inline-block", marginRight: "1rem"}}>
                        <div class="card-body">
                            <h5 class="card-title">Name: {user.name.first} {user.name.last}</h5>
                            <h6 class="card-subtitle mb-2">Email: {user.email}</h6>
                            <h6 class="card-subtitle mb-2">Created: {user.created}</h6>
                            <h6 class="card-subtitle mb-2">Updated: {user.updated}</h6>
                            <h6 class="card-subtitle mb-2">Admin: {(`${user.admin}`).toUpperCase()}</h6>
                            <button className="btn submit-btn btn-warning"><i class="fas fa-edit"></i> Edit</button>
                            <button className="btn submit-btn btn-danger" onClick={() => this.props.delClick(user._id)}><i class="fas fa-trash-alt"></i> Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
