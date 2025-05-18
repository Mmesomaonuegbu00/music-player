'use client';
import React, { useState } from 'react';
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlaySquareIcon,
  HeartIcon,
  UserIcon,
  SettingsIcon,
} from 'lucide-react';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { CgClose } from 'react-icons/cg';

const menuItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: 'Home' },
  { icon: <SearchIcon className="w-5 h-5" />, label: 'Search' },
  { icon: <LibraryIcon className="w-5 h-5" />, label: 'Library' },
  { icon: <PlaySquareIcon className="w-5 h-5" />, label: 'Playlists' },
  { icon: <HeartIcon className="w-5 h-5" />, label: 'Favorites' },
  { icon: <UserIcon className="w-5 h-5" />, label: 'Profile' },
  { icon: <SettingsIcon className="w-5 h-5" />, label: 'Settings' },
];

const SideLeft = () => {
  const [sideNav, setSideNav] = useState(false)

  const handleclick = () => {
    setSideNav(!sideNav)
  }

  return (
    <div>
      <div className='flex justify-between'>
        <div className="flex items-center px-4  pt-8 pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-10 h-10 text-green-700"
          >
            <path d="M12 1C6.5 1 2 5.5 2 11v5c0 2.2 1.8 4 4 4h1c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1H5v-1c0-3.9 3.1-7 7-7s7 3.1 7 7v1h-2c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h1c2.2 0 4-1.8 4-4v-5c0-5.5-4.5-10-10-10z" />
          </svg>
          <h1 className='font-bold font-sans  text-3xl lg;text-4xl  text-green-700 drop-shadow-sm drop-shadow-green-700'>MUSIC</h1>
        </div>
        <HiBars3CenterLeft className='xl:hidden mt-8  w-10 h-10 font-extrabold dark:text-gray-300' onClick={handleclick} />
      </div>
      <div className=" hidden xl:flex flex-col space-y-4 h-full pt-6 px-6 py-8 ">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-500/10 hover:shadow transition duration-200 dark:text-gray-300 text-gray-800 cursor-pointer"
          >
            {item.icon}
            <span className="text-base font-medium dark:text-gray-300 text-gray-800">{item.label}</span>
          </div>
        ))}
      </div>
      {sideNav && (
        <div
          className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
          onClick={handleclick}
        >
          <div
            className="xl:hidden flex flex-col space-y-4 h-full pt-6 px-6 py-8 relative bg-white w-[50%] "
            onClick={(e) => e.stopPropagation()}
          >
            <CgClose onClick={handleclick}  className='absolute right-0 w-8 h-8 font-extrabold '/>
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-green-500/10 hover:shadow transition duration-200 dark:text-gray-300 text-gray-800 cursor-pointer m"
              >
                {item.icon}
                <span className="text-base font-medium dark:text-gray-300 text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SideLeft;
