import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => (
    <>
        <Header />
        <div className="p-8 min-h-[60vh] mt-[150px]">
            <h1 className="text-2xl font-bold mb-4 text-center">Privacy Policy</h1>
            <p className="text-center">
                Your privacy is important to us. This page will describe how we collect, use, and protect your data.
            </p>
        </div>
        <Footer />
    </>
);

export default PrivacyPolicy;
