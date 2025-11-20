import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_URL // <-- for future API calls

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (storedUser) setUser(storedUser)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("uid")
        navigate("/login")
    }

    if (!user) return <p className="text-center mt-20">Loading...</p>

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="pt-24 flex justify-center">
                <div className="w-full max-w-6xl space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left: Profile Details */}
                        <div className="flex-1 bg-white p-8 rounded-xl shadow-lg">
                            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Profile</h1>
                            <div className="space-y-3 text-gray-700 text-lg">
                                <p><span className="font-semibold">Name:</span> {user.name}</p>
                                <p><span className="font-semibold">Email:</span> {user.email}</p>
                                <p><span className="font-semibold">Age Group:</span> {user.ageGroup}</p>
                            </div>
                        </div>

                        {/* Right: Interested Categories */}
                        <div className="flex-1 bg-blue-50 p-8 rounded-xl shadow-lg">
                            <h2 className="text-xl font-semibold mb-3 text-center md:text-left">Interested In</h2>
                            <p className="text-gray-700 text-lg text-center md:text-left">
                                {user.feed?.length ? user.feed.join(', ') : 'No interests'}
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
