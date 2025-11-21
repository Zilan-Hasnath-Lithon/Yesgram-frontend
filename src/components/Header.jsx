import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PiWallFill } from "react-icons/pi"
import { MdFacebook, MdAccountCircle } from "react-icons/md"
import { FaYoutube } from "react-icons/fa"
import { AiFillInstagram } from "react-icons/ai"
import { TiThMenu } from "react-icons/ti"

const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user?._id
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const isActive = (path) => location.pathname === path

    return (
        <header className="bg-white shadow-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl sm:text-4xl font-bold cursor-pointer">
                        <Link to="/">Yesgram!</Link>
                    </h1>
                </div>

                <nav className="hidden md:flex items-center gap-8 text-2xl">
                    <Link
                        to="/"
                        className={`relative ${isActive('/') ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1.5 after:rounded-full after:bg-black' : ''}`}
                    >
                        <PiWallFill size={34} />
                    </Link>

                    <Link
                        to={userId ? `/youtube/${userId}` : '/login'}
                        className={`relative ${isActive(`/youtube/${userId}`) ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1.5 after:rounded-full after:bg-black' : ''}`}
                    >
                        <FaYoutube size={34} />
                    </Link>

                    <Link
                        to={userId ? `/facebook/${userId}` : '/login'}
                        className={`relative ${isActive(`/facebook/${userId}`) ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1.5 after:rounded-full after:bg-black' : ''}`}
                    >
                        <MdFacebook size={34} />
                    </Link>

                    <Link
                        to={userId ? `/instagram/${userId}` : '/login'}
                        className={`relative ${isActive(`/instagram/${userId}`) ? 'after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1.5 after:rounded-full after:bg-black' : ''}`}
                    >
                        <AiFillInstagram size={34} />
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Link
                        to={userId ? `/profile/${userId}` : '/login'}
                        className={`text-2xl relative ${isActive(`/profile/${userId}`) ? 'border-b-4 border-blue-500' : ''}`}
                    >
                        <MdAccountCircle size={38} />
                    </Link>

                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <TiThMenu size={34} />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <nav className="md:hidden bg-white shadow-md w-full absolute top-16 left-0 flex flex-col items-center py-4 gap-4 text-2xl">
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={`${isActive('/') ? 'font-bold' : ''}`}
                    >
                        Home
                    </Link>

                    <Link
                        to={userId ? `/youtube/${userId}` : '/login'}
                        onClick={() => setMenuOpen(false)}
                        className={`${isActive(`/youtube/${userId}`) ? 'font-bold' : ''}`}
                    >
                        Youtube
                    </Link>

                    <Link
                        to={userId ? `/facebook/${userId}` : '/login'}
                        onClick={() => setMenuOpen(false)}
                        className={`${isActive(`/facebook/${userId}`) ? 'font-bold' : ''}`}
                    >
                        Facebook
                    </Link>

                    <Link
                        to={userId ? `/instagram/${userId}` : '/login'}
                        onClick={() => setMenuOpen(false)}
                        className={`${isActive(`/instagram/${userId}`) ? 'font-bold' : ''}`}
                    >
                        Instagram
                    </Link>
                </nav>
            )}
        </header>
    )
}

export default Header
