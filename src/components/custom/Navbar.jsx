import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Pen, CircleUser, User, UserRoundPen } from 'lucide-react';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <nav className="flex justify-between items-center pl-3 pr-3 pt-4 pb-4 bg-slate-300">
      <div>
        <Link to={'/'}>
          <h2 className="text-2xl font-bold text-slate-800">Logo</h2>
        </Link>
      </div>

      {!isAuthenticated ? (
        <div className="flex gap-4">
          <Button>
            <Link to={'/login'}>Log In</Link>
          </Button>

          <Button>
            <Link to={'/register'}>Register</Link>
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <span
            onClick={toggleDropdown}
            className="flex items-center text-white focus:outline-none bg-black p-2 rounded-full cursor-pointer"
          >
            <User />
          </span>

          {dropdownOpen && (
            <div className="absolute right-3 top-14 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Link
                  to="/create-post"
                  className="flex justify-start items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {' '}
                  <Pen size={15} />
                  Create Post
                </Link>
                <Link
                  to="/profile"
                  className="flex justify-start items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  <UserRoundPen size={15} />
                  Profile
                </Link>

                <div className="h-[2px] w-full bg-slate-300"></div>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
