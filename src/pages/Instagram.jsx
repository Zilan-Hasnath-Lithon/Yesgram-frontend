import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

const Instagram = () => {
    const { userId } = useParams()
    const [igData, setIgData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const apiUrl = import.meta.env.VITE_API_URL // <-- use your .env variable

    useEffect(() => {
        if (!userId) return

        const fetchFeed = async () => {
            try {
                const res = await axios.get(`${apiUrl}/instagram/${userId}`)
                const instagramOnly = res.data.filter(item => item.media === 'Instagram')
                const sorted = instagramOnly.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setIgData(sorted)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchFeed()
    }, [userId, apiUrl])

    useEffect(() => {
        // Load Instagram embed script after data is set
        if (igData.length > 0 && window.instgrm) {
            window.instgrm.Embeds.process()
        }
    }, [igData])

    if (loading) return <p className="text-center mt-20">Loading feed...</p>
    if (error) return <div className="text-center mt-20 text-red-500">Error: {error.message}</div>

    return (
        <>
            <Header />
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-22">
                {igData.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No content available for your interests.</p>
                ) : (
                    igData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <blockquote
                                className="instagram-media w-full"
                                data-instgrm-permalink={item.link}
                                data-instgrm-version="14"
                            ></blockquote>
                            <p className="text-lg font-semibold mt-2 text-center">
                                {item.title} || {item.category}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <script async src="//www.instagram.com/embed.js"></script>
        </>
    )
}

export default Instagram
