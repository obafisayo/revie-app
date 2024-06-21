import React from 'react'
import HeroImg from "../../assets/logo.svg"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="bg-blue-500 border-b-2">
      <div className="container flex items-center">
        <header className="text-white py-4 px-6 flex items-center w-1/4">
              <img className="h-10 w-10" src={HeroImg} alt='logo'/>
              <Link to={"/"}>
                  <h1 className="text-xl font-bold">Revie</h1>
              </Link>
        </header>
        <nav className="w-3/4 font-medium text-white/80">
          <ul>
            <Link to={"/reviews"}>
              <li>
                  Reviews
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div> 
  )
}

export default Navbar;