import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Use env variable for backend URL
    const apiUrl = import.meta.env.VITE_API_URL;

    const adminBtn = (e) => {
        e.preventDefault(); // prevent page reload
        axios.post(`${apiUrl}/adminlogin`, { email, password })  // corrected template literal
            .then(res => {
                localStorage.setItem("admin", JSON.stringify(res.data));
                navigate("/feedmaker/" + res.data._id);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-sm">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Admin Login</h1>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-600 font-medium">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-2 text-gray-600 font-medium">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        onClick={adminBtn}
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
