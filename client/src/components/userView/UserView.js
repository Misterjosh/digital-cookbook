import React from 'react';
import './userView.css';

export default function UserView({ first, last, email, created, updated, admin }) {
    return (
        <div className="container" style={{paddingTop: "1%", paddingBottom: "1%", margin: "0 auto", justifyContent: "center", overflow: "hidden", marginBottom: "10%"}}>
            <div className="child" class="card" style={{marginTop: "1rem", zIndex: "-5", display: "inline-block"}}>
                <div class="card-body" style={{textAlign: "left"}}>
                    <h5 class="card-title"><span>Name: </span>{first} {last}</h5>
                    <h6 class="card-subtitle mb-2"><span>Email: </span>{email}</h6>
                    <h6 class="card-subtitle mb-2"><span>Created: </span>{created}</h6>
                    <h6 class="card-subtitle mb-2"><span>Updated: </span>{updated}</h6>
                    <h6 class="card-subtitle mb-2"><span>Admin: </span>{(`${admin}`).toUpperCase()}</h6>
                </div>
            </div>
        </div>
    )
}
