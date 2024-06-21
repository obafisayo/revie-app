import React from 'react';
import HeroImg from "../../assets/hero_review.jpeg"
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-blue-500 text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Revie</h1>
        <p className="text-lg mb-8">
          Your go-to platform for honest reviews from customers and clients.
        </p>
        <img
          src={HeroImg}
          alt="Revie-Image"
          className="mx-auto mb-8 rounded-full"
        />
        <div>
          <button className="bg-white text-blue-500 px-6 py-2 rounded-full font-semibold mr-4">
            <Link to={"/register"}>
              Get Started
            </Link>
          </button>
          <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full font-semibold">
            <Link to={"/login"}>
              Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
