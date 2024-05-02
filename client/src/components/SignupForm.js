import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function SignupForm() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const { signUpUser } = useOutletContext();

    function updateFormData(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        signUpUser(formData);
    }

    return (
        <div className="border border-gray-600 p-4 rounded-lg max-w-md mx-auto">
            <h2 className="text-xl mb-4">Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={updateFormData}
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    required
                    className="block w-full border border-gray-400 rounded-md py-2 px-4 mb-4"
                />
                <input
                    onChange={updateFormData}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    required
                    className="block w-full border border-gray-400 rounded-md py-2 px-4 mb-4"
                />
                <input
                    onChange={updateFormData}
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    required
                    className="block w-full border border-gray-400 rounded-md py-2 px-4 mb-4"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Signup
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
