import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Youtube from '../pages/Youtube'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import AdminLogin from '../pages/AdminLogin'
import FeedMaker from '../pages/FeedMaker'
import Facebook from '../pages/Facebook'
import Instagram from '../pages/Instagram'

// Footer pages
import Contact from '../pages/Contact'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import Terms from '../pages/Terms'
import Faq from '../pages/Faq'
import Sitemap from '../pages/Sitemap'

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/adminlogin' element={<AdminLogin />} />
                <Route path='/feedmaker/:adminId' element={<FeedMaker />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path='/youtube/:userId' element={<Youtube />} />
                <Route path='/facebook/:userId' element={<Facebook />} />
                <Route path='/instagram/:userId' element={<Instagram />} />

                
                <Route path='/contact' element={<Contact />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='/sitemap' element={<Sitemap />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes
