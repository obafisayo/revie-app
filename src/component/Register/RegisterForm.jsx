import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const url = 'https://codeguru.isaac0yen.com';
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(`${url}/api/users/register`, formData);
        console.log('User registered successfully:', response.data);
        alert(response.data.message)
        setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            console.error('Error registering user:', error.message);
            alert("User might already be existing!!!, try logging in 🙏")
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
            >
                <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="name"
                >
                    Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className="mb-6">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                >
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register
                </button>
                </div>
            </form>
            <div className="gap-2 flex items-center flexcol">
                <small>Already have an account?</small>
                <Link to={"/login"}>
                    <button
                        className="bg-sky-300 hover:bg-sky-500 shadow-md text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                            Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RegisterForm;