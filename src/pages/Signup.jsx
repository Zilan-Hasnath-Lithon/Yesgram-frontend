import React, { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [ageGroup, setAgeGroup] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])

    const categories = [
        'animals', 'art', 'books', 'celebrity', 'coding', 'comedy', 'DIY', 'education',
        'environment', 'fashion', 'food', 'fun', 'gaming', 'geography', 'health', 'history',
        'life skills', 'lifestyle', 'math', 'movies', 'music', 'news', 'politics', 'science',
        'space', 'sports', 'stories', 'technology', 'travel'
    ]

    const handleSelectCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        )
    }
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const handleSignup = async () => {
        if (!name || !ageGroup || !gender || !phone || !email || !password || selectedCategories.length === 0) {
            alert('Please fill all fields and select at least one category')
            return
        }

        try {
            await axios.post(`${apiUrl}/signup`, {
                name,
                ageGroup,
                gender,
                feed: selectedCategories,
                phone,
                email,
                password
            });
            alert('Signup successful');
            setName('');
            setAgeGroup('');
            setGender('');
            setPhone('');
            setEmail('');
            setPassword('');
            setSelectedCategories([]);
            navigate('/login');
        } catch (err) {
            alert('Signup failed');
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex justify-center pt-20 px-4 ">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Create Account</h1>
                    <p className="text-center text-gray-600 mb-6">Quick and easy signup</p>

                    <ul className="flex flex-col gap-4">
                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Name</span>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </li>

                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Age Group</span>
                            <select
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={ageGroup}
                                onChange={(e) => setAgeGroup(e.target.value)}
                            >
                                <option value="">Select your age group</option>
                                <option>Kid</option>
                                <option>Teen</option>
                                <option>Adult</option>
                            </select>
                        </li>

                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Gender</span>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        className="accent-blue-500"
                                        checked={gender === 'Male'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Male
                                </label>
                                <label className="flex items-center gap-1">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        className="accent-pink-500"
                                        checked={gender === 'Female'}
                                        onChange={(e) => setGender(e.target.value)}
                                    />
                                    Female
                                </label>
                            </div>
                        </li>

                        <li className="flex flex-col gap-2">
                            <span className="font-medium">Custom Your Feed</span>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => handleSelectCategory(category)}
                                        className={`px-3 py-1 rounded-full border text-sm transition-colors duration-200 ${selectedCategories.includes(category)
                                            ? 'bg-blue-500 text-white border-blue-500'
                                            : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </li>

                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Mobile</span>
                            <input
                                type="text"
                                placeholder="Enter your mobile number"
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </li>

                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Email</span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </li>

                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Password</span>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </li>
                    </ul>

                    <button
                        onClick={handleSignup}
                        className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Signup
