import {useState} from 'react';

import { useOutletContext } from 'react-router-dom';

function SignupForm(){

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
       
    })

    const {signUpUser} = useOutletContext()

    function updateFormData(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()

        signUpUser(formData)
    }

    return (
        <div className="new-signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <input onChange={updateFormData} type="text" name="username" placeholder="Username" value={formData.username} required />
            <input onChange={updateFormData} type="password" name="password" placeholder="Password" value={formData.password} required />
            <input onChange={updateFormData} type="text" name="email" placeholder="Email" value={formData.first_name} required />
            
            <button type="submit">Signup</button>
        </form>
    </div>
    )
}

export default SignupForm;