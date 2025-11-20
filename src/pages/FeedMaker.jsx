import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FeedMaker = () => {
    const { adminId } = useParams();
    const [title, setTitle] = useState('');
    const [media, setMedia] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [link, setLink] = useState('');

    const apiUrl = import.meta.env.VITE_API_URL; // <-- use .env

    const categories = [
        'animals', 'art', 'books', 'celebrity', 'coding', 'comedy', 'DIY', 'education',
        'environment', 'fashion', 'food', 'fun', 'gaming', 'geography', 'health', 'history',
        'life skills', 'lifestyle', 'math', 'movies', 'music', 'news', 'politics', 'science',
        'space', 'sports', 'stories', 'technology', 'travel'
    ];

    const mediaOptions = ['Youtube', 'Facebook', 'Instagram', 'Other'];

    const handleSelectCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const handleSubmit = async () => {
        if (!title || !media || selectedCategories.length === 0 || !link) {
            alert('Please fill all fields and select at least one category');
            return;
        }

        try {
            await axios.post(`${apiUrl}/feedermaker/${adminId}`, {
                title,
                media,
                category: selectedCategories,
                link
            });
            alert('Feed saved successfully');
            setTitle('');
            setMedia('');
            setSelectedCategories([]);
            setLink('');
        } catch (err) {
            alert('Failed to save feed');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex justify-center pt-20 px-4">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Add New Feed</h1>
                    <p className="text-center text-gray-600 mb-6">Manage content for your platform</p>

                    <ul className="flex flex-col gap-4">
                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Title</span>
                            <input
                                type="text"
                                placeholder="Enter feed title"
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </li>

                        <li className="flex flex-col gap-1">
                            <span className="font-medium">Media</span>
                            <select
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={media}
                                onChange={(e) => setMedia(e.target.value)}
                            >
                                <option value="">Select media</option>
                                {mediaOptions.map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        </li>

                        <li className="flex flex-col gap-2">
                            <span className="font-medium">Categories</span>
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
                            <span className="font-medium">Link</span>
                            <input
                                type="text"
                                placeholder="Enter media link"
                                className="border rounded px-3 h-10 focus:ring-2 focus:ring-blue-400"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        </li>
                    </ul>

                    <button
                        onClick={handleSubmit}
                        className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Save Feed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedMaker;
