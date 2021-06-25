import React from 'react';
import './signupForm.css';

export default function SignUpForm({ fName, lName, email, password, onSubmit, handleInputChange }) {
    return (
        <div>
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
                    <button type="submit" className="btn btn-primary submit-btn" onClick={onSubmit}>Create Account</button>
                </form>
        </div>
    )
}