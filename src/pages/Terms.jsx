import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => (
    <>
        <Header />
        <div className="p-8 min-h-[60vh] mt-[150px]">
            <h1 className="text-2xl font-bold mb-4 text-center">Terms and Conditions</h1>
            <p className="text-center">
                Please read these terms and conditions carefully before using our website.
            </p>
        </div>
        <Footer />
    </>
);

export default Terms;
