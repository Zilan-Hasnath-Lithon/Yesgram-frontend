import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        setUser(storedUser || null)

        if (storedUser) {
            const fetchFeed = async () => {
                try {
                    const res = await axios.get(`${apiUrl}/?userId=${storedUser._id}`)
                    setFeed(res.data)
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
            fetchFeed()
        } else {
            setLoading(false) // stop loading if no user
        }
    }, [apiUrl])

    useEffect(() => {
        if (feed.length > 0 && window.instgrm) {
            window.instgrm.Embeds.process()
        }
    }, [feed])

    if (loading) return <p className="text-center mt-20">Loading feed...</p>
    if (error) return <div className="text-center mt-20 text-red-500">Error: {error.message}</div>

    return (
        <>
            <Header />
            <div className=" min-h-[84vh] flex flex-col items-center justify-center pt-[72px]">
                {!user ? (
                    <div className="text-center space-y-6">
                        <p className="text-2xl font-semibold text-gray-700">
                            Please login/signup to enjoy quality content
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate("/login")}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/signup")}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {feed.length === 0 ? (
                            <p className="col-span-full text-center text-gray-500">
                                No content available for your interests.
                            </p>
                        ) : (
                            feed.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    {item.media === "Youtube" && (
                                        <iframe
                                            className="w-full h-52 rounded-[10px]"
                                            src={item.link
                                                .replace('watch?v=', 'embed/')
                                                .replace('youtu.be/', 'www.youtube.com/embed/')}
                                            allowFullScreen
                                            title={item.title}
                                        ></iframe>
                                    )}
                                    {item.media === "Facebook" && (
                                        <iframe
                                            className="w-full h-52 rounded-[10px]"
                                            src={item.link.includes('/videos/')
                                                ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.link)}`
                                                : `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(item.link)}`}
                                            allowFullScreen
                                            title={item.title || 'Facebook Post'}
                                        ></iframe>
                                    )}
                                    {item.media === "Instagram" && (
                                        <blockquote
                                            className="instagram-media w-full"
                                            data-instgrm-permalink={item.link}
                                            data-instgrm-version="14"
                                        ></blockquote>
                                    )}
                                    <p className="text-lg font-semibold mt-2 text-center">
                                        {item.title} || {item.category}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Home
