import React from 'react'

export default function UserInfoCard({first, last, email, admin}) {
    return (
        <div className="container" style={{paddingTop: "1%", paddingBottom: "1%", margin: "0 auto", justifyContent: "center", overflow: "hidden", marginBottom: "10%"}}>
            <div className="card" style={{marginTop: "1rem", zIndex: "-5", display: "inline-block"}}>
                <div className="card-body" style={{textAlign: "left"}}>
                    <h5 className="card-title"><span>Name: </span>{first} {last}</h5>
                    <h6 className="card-subtitle mb-2"><span>Email: </span>{email}</h6>
                    <h6 className="card-subtitle mb-2"><span>Admin: </span>{admin}</h6>
                </div>
            </div>
        </div>
    )
}
