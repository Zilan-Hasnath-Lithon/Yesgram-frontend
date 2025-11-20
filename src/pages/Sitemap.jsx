import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Sitemap = () => (
    <>
        <Header />
        <div className="p-8 min-h-[60vh] mt-[150px]">
            <h1 className="text-2xl font-bold mb-4 text-center">Site Map</h1>
            <ul className="list-disc list-inside text-center space-y-2">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/youtube">YouTube Feed</Link></li>
                <li><Link to="/facebook">Facebook Feed</Link></li>
                <li><Link to="/instagram">Instagram Feed</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms and Conditions</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
            </ul>
        </div>
        <Footer />
    </>
);

export default Sitemap;
