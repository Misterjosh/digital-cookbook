import React from 'react'

export default function UserEditForm({ fName, lName, email, password, onSubmit, handleInputChange, adminFalse, adminTrue, adminVal }) {
    return (
        <div style={{paddingTop: "5%", textAlign: "left"}}>
            <form>
                <input
                    value={fName}
                    name="fName" 
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="First Name" />
                    <br />
                <input
                    value={lName}
                    name="lName" 
                    onChange={handleInputChange}
                    type="text" 
                    placeholder="Last Name" />
                    <br />
                <input
                    value={email}
                    name="email"
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="Email" />
                    <br />
                <input
                    value={password}
                    name="password"
                    onChange={handleInputChange} 
                    type="password" 
                    placeholder="Password" />
                    <br />
                <fieldset className="row mb-3">
                    <h4>Admin Status: {(`${adminVal}`.toUpperCase())}</h4>
                    <div className="col-sm-10">
                        <div className="forms-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="adminFalse" value="false" checked={adminVal === false} onChange={adminFalse}/>
                            <label className="form-check-label" for="adminFalse">Not Admin</label>
                        </div>
                        <div className="forms-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="adminTrue" value="true" checked={adminVal === true} onChange={adminTrue}/>
                            <label className="form-check-label" for="adminTrue">Set as Admin</label>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="btn btn-warning submit-btn" onClick={onSubmit}><i class="fas fa-edit"></i> Update Information</button>
            </form>   
        </div>
    )
}
