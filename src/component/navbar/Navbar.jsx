import React from 'react'
import HeroImg from "../../assets/logo.svg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="bg-blue-500 text-white py-4 px-6 flex items-center">
        <img className="h-10 w-10" src={HeroImg} alt='logo'/>
        <Link to={"/"}>
            <h1 className="text-xl font-bold">Revie</h1>
        </Link>
    </header>
  )
}

export default Navbar;