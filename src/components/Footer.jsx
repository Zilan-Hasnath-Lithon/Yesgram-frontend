import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='pt-10'>
            <div className='bottom-0 bg-white shadow-2xl py-9 w-full text-[13px]'>
                <h1 className='flex justify-center'>yesgram © 2025</h1>
                <ul className='flex flex-row gap-5 justify-center mt-2'>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/terms">Terms and Conditions</Link></li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/sitemap">Site Map</Link></li>
                </ul>

            </div>
        </div>


    )
}

export default Footer
