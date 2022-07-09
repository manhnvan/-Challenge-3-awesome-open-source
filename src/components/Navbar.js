import React from "react";
import { useNavigate, createSearchParams } from 'react-router-dom'
import open from '../assets/open.png'
import { login, logout } from '../utils'

function Navbar(props) {
  const navigate = useNavigate()
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <img
                className="block lg:hidden h-10 w-auto"
                src={open}
                alt="Workflow"
              />
              <img
                className="hidden lg:block h-10 w-auto"
                src={open}
                alt="Workflow"
              />
              <span className="text-white ml-3 text-lg font-semibold">
                Awesome Open Sources
              </span>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {!window.walletConnection.isSignedIn() ? (
              <button
                type="button"
                onClick={login}
                className="bg-white hover:bg-gray-700 font-semibold px-3 py-2 text-gray-800 rounded-md text-sm font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                Log in
              </button>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="bg-white hover:bg-gray-700 font-semibold px-3 py-2 text-gray-800 rounded-md text-sm font-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
