import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../common/Header';
import Alert from "../common/Alert";
import './Users.css';

const RegistrationForm = ({signup, lunches}) => {
    const history = useHistory();
    const initialState = {
                            username: "",
                            password: "",
                            firstName: "",
                            lastName: "",
                            email: "",
                        }
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [registrationConfirmed, setRegistrationConfirmed] = useState(false);
           
  

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await signup(formData);
        if(res.success) {
            history.push('/');
            setRegistrationConfirmed(true);
        } else {
            setFormErrors(res.errors);
        }
    }

    // Updates form data fields on change
    function handleChange(evt) {
        const{name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
    }

    // console.log("lunches: ", lunches)
    return (
        <div className='Form'>
            <Header />
            <div className='Form-container'>
                <h3 className='RegistrationForm-h3'>Sign up here:</h3>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input 
                        className="RegistrationForm-usernameInput"
                        type="text"
                        name="username"
                        id="username" 
                        value={formData.username}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="password">Password: </label>
                    <input 
                        className="RegistrationForm-passwordInput"
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        className="RegistrationForm-firstNameInput"
                        type="text"
                        name="firstName"
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        className="RegistrationForm-lastNameInput"
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="email">E-mail: </label>
                    <input 
                        className="RegistratonForm-emailInput"
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="diet">Diet Type: </label>
                    <input 
                        className='ProfileForm-dietInput'
                        type="text"
                        name="diet"
                        id="diet"
                        value={formData.diet}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="allergies">Food Allergies: </label>
                    <input 
                        className='ProfileForm-allergiesInput'
                        type="text"
                        name="allergies"
                        id="allergies"
                        value={formData.allergies}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="preferences">Food Preferences: </label>
                    <input 
                        className='ProfileForm-preferencesInput'
                        type="text"
                        name="preferences"
                        id="preferences"
                        value={formData.preferences}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="aversions">Food Aversions: </label>
                    <input 
                        className='ProfileForm-aversionsInput'
                        type="text"
                        name="aversions"
                        id="aversions"
                        value={formData.aversions}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <br></br>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    {registrationConfirmed ? <Alert messages={["Registration successful!"]} /> : null}
                    <span className='Form-Btn-Container'><button className='navBtn' type="submit" onSubmit={handleSubmit}>Sign Up!</button></span>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;