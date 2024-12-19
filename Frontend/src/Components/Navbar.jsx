import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ModalContainer, { useModal } from '../ContextApi/Modal/ModalContext';
import { useDisclosure } from '@chakra-ui/react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
    const navigate = useNavigate();
    const token  = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const {showModal} = useModal();

    // Toggle mobile menu on hamburger click
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    // Toggle login state
    async function  handleLogout(){
        try{
          let res = await fetch("https://petpals-4.onrender.com/users/logout");
          let data=await res.json();
          console.log(data);
          localStorage.removeItem("token");
          navigate("/");
    
        }
        catch(e){
          console.log(e);
        }
    }

    return (
        <nav className="bg-[#003049] p-4 content-center fixed top-0 left-0 right-0 z-40 ">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo or Brand Name */}
          <div className="text-white font-bold text-xl">CodeZilla...</div>
  
          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden flex items-center" onClick={toggleMobileMenu}>
            <button className="text-white">
              {isMobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
  
          {/* Navbar Links */}
          <div className="hidden lg:flex lg:justify-center lg:items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link to="/createEvent" className="text-white hover:text-gray-300">
              Create Event
            </Link>
  
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={()=>{
                    showModal({
                        body: <p>Do you want to log out?</p>,
                        onSave: handleLogout,})
                }}
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>
  
        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col items-center">
            <Link to="/" className="text-white py-2 hover:text-gray-300">
              Home
            </Link>
            <Link to="/about" className="text-white py-2 hover:text-gray-300">
              About
            </Link>
            <Link to="/createEvent" className="text-white py-2 hover:text-gray-300">
            Create Event
            </Link>
  
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Signup
                </button>
              </>
            ) : (
              <button
                onClick={()=>{
                    showModal({heading: "Dynamic Modal",
                        body: <p>This is dynamic content for the modal body.</p>,
                        onSave: handleLogout,})
                }}
                className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 rounded"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;