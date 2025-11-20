import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const Facebook = () => {
    const { userId } = useParams();
    const [fbData, setFbData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL; // <-- use .env

    useEffect(() => {
        if (!userId) return;

        const fetchFeed = async () => {
            try {
                const res = await axios.get(`${apiUrl}/facebook/${userId}`);

                const facebookOnly = res.data.filter(item => item.media === 'Facebook');

                const formatted = facebookOnly.map(item => {
                    let embedUrl = item.link;
                    if (embedUrl) {
                        embedUrl = embedUrl.includes('/videos/')
                            ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(embedUrl)}`
                            : `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(embedUrl)}`;
                    }
                    return { ...item, link: embedUrl };
                }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setFbData(formatted);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, [userId, apiUrl]);

    if (loading) return <p className="text-center mt-20">Loading feed...</p>;
    if (error) return <div className="text-center mt-20 text-red-500">Error: {error.message}</div>;

    return (
        <>
            <Header />
            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-22">
                {fbData.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No content available for your interests.</p>
                ) : (
                    fbData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {item.link ? (
                                <iframe
                                    className="w-full h-52 rounded-[10px]"
                                    src={item.link}
                                    allowFullScreen
                                    title={item.title || 'Facebook Post'}
                                ></iframe>
                            ) : (
                                <p className="text-center">{item.content}</p>
                            )}
                            <p className="text-lg font-semibold mt-2 text-center">
                                {item.title || 'Facebook Post'} || {item.category}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Facebook;
