import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaGithub, FaTwitter } from 'react-icons/fa';

const Contact = () => (
    <>
        <Header />
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-20 px-4 mt-[100px]">
            <div className="bg-white shadow-xl rounded-2xl p-10 max-w-3xl w-full text-center">
                <h1 className="text-4xl font-bold mb-6 text-blue-600">Contact Us</h1>
                <p className="text-gray-700 mb-6">
                    This website was created by <span className="font-semibold">Zilan Hasnath Lithon</span> as a class project.
                    Any use of media or content from social platforms is unintentional and not meant to violate any laws.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-8 mb-6">
                    <a
                        href="https://github.com/Zilan-Hasnath-Lithon"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
                    >
                        <FaGithub className="text-black text-2xl" /> GitHub
                    </a>
                    <a
                        href="https://x.com/ZilanHasnath"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg transition"
                    >
                        <FaTwitter className="text-blue-600 text-2xl" /> X / Twitter
                    </a>
                </div>

                <p className="text-gray-800 text-lg font-medium">We are happy to hear from you!</p>
            </div>
        </div>
        <Footer />
    </>
);

export default Contact;
