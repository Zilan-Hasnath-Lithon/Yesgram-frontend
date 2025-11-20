import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

const Youtube = () => {
    const { userId } = useParams()
    const [ytData, setYtData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const apiUrl = import.meta.env.VITE_API_URL // <-- use your .env variable

    useEffect(() => {
        if (!userId) return

        const fetchFeed = async () => {
            try {
                const res = await axios.get(`${apiUrl}/youtube/${userId}`)

                const youtubeOnly = res.data.filter(item => item.media === 'Youtube')

                const formatted = youtubeOnly.map(item => ({
                    ...item,
                    link: item.link
                        .replace('watch?v=', 'embed/')
                        .replace('youtu.be/', 'www.youtube.com/embed/')
                }))
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

                setYtData(formatted)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchFeed()
    }, [userId, apiUrl])

    if (loading) return <p className="text-center mt-20">Loading feed...</p>
    if (error) return <div className="text-center mt-20 text-red-500">Error: {error.message}</div>

    return (
        <>
            <Header />
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-22">
                {ytData.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No content available for your interests.</p>
                ) : (
                    ytData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <iframe
                                className="w-full h-52 rounded-[10px]"
                                src={item.link}
                                allowFullScreen
                                title={item.title}
                            ></iframe>
                            <p className="text-lg font-semibold mt-2 text-center">
                                {item.title} || {item.category}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default Youtube
