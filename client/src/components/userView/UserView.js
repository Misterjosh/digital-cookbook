import React from 'react';
import './userView.css';

export default function UserView({ first, last, email, created, updated }) {
    return (
        <div className="container">
            <div className="row">
                <div className="col col-md-3 col-lg-3"></div>
                <div className="col col-md-6 col-lg-6 wht-bg">
                    <span><strong>Name:</strong> {first} {last}</span><br />
                    <span><strong>Email:</strong> {email}</span><br />
                    <span><strong>Created:</strong> {created}</span><br />
                    <span><strong>Last Updated:</strong> {updated}</span>
                </div>
                <div className="col col-md-3 col-lg-3"></div>
            </div>
        </div>
    )
}
