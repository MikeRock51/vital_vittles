import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div>
      <nav className="bg-red-700 p-4 shadow-md md:flex md:justify-between md:items-center h-16">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4 md:space-x-8">
            <li className="mr-6">
              <Link to="/" className="text-white font-bold">Home</Link>
            </li>
            <li className="mr-6">
              <Link to="/chat" className="text-white font-bold">ChatBot</Link>
            </li>
            <li className="mr-6">
              <Link to="/users" className="text-white font-bold">Users</Link>
            </li>
          </ul>
          <ul className="flex">
            <li>
              <Link to="/logout" className="text-white ml-auto font-bold">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
