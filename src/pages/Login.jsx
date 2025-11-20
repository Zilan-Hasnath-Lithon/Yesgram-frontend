import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // Add this line to use your Render backend
    const apiUrl = import.meta.env.VITE_API_URL

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${apiUrl}/login`, { email, password })
            localStorage.setItem("user", JSON.stringify(res.data))  // store full user
            navigate("/")  // redirect to Home which handles feed based on logged-in user
        } catch (err) {
            console.error(err)
            alert("Login failed. Please check your credentials.")
        }
    }

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-[400px] bg-white p-8 rounded-lg shadow-lg flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-center mb-4">Yesgram!</h1>

                    <input
                        type="email"
                        placeholder="Email or Phone"
                        className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Login
                    </button>

                    <Link to='/signup' className="mt-4 text-center text-blue-600 hover:underline">
                        Create a new account
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login
