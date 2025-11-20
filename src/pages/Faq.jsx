import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FAQ = () => (
    <>
        <Header />
        <div className="p-8 min-h-[60vh] mt-[150px]">
            <h1 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
            <ul className="list-disc list-inside text-center space-y-2">
                <li>How do I sign up? → Go to the Sign Up page and fill the form.</li>
                <li>How can I change my interests? → Go to your profile page and update your feed.</li>
                <li>Who can I contact for support? → Email support@yesgram.com</li>
            </ul>
        </div>
        <Footer />
    </>
);

export default FAQ;
