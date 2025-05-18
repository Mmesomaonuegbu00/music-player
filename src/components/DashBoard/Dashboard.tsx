/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState, useRef, useEffect } from 'react';
import SideLeft from '../SideLeft/SideLeft';
import Main from '../Main/Main';
import SideRight from '../SideRight/SideRight';
import Darkmode from '../Darkmode';
import { BellDotIcon } from 'lucide-react';

const Dashboard = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [selectedSong, setSelectedSong] = useState<any | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search function
  const searchMusic = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const res = await fetch(`/api/search?term=${encodeURIComponent(searchTerm)}`);
    const data = await res.json();

    const filteredResults = data.results?.filter((song: { trackName: string; artistName: string; }) =>
      song.trackName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artistName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(filteredResults || []);
  };

  useEffect(() => {
    if (term.trim()) {
      searchMusic(term);
    }
  }, [term]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchMusic(term);
    }
  };

  const handleSelectSong = (song: any) => {
    setSelectedSong(song);
    setResults([]); // Hide dropdown
    setTerm('');
  };

  return (
    <div className="min-h-screen grid xl:grid-cols-12 dark:bg-[#060706] bg-[#e9e9e9] gap-8">
      {/* Left Sidebar */}
      <div className="lg:col-span-2 bg-gradient-to-b from-gray-200/10 to-green-900/10 dark:bg-black dark:backdrop-blur-lg border dark:border-white/20 border-gray-300 dark:shadow-lg h-full">
        <SideLeft />
      </div>

      {/* Main + Right */}
      <div className="xl:col-span-10 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 h-full">
          {/* Main content */}
          <div className="lg:col-span-6 flex flex-col h-full">
            {/* Search bar */}
            <div className="relative flex justify-between items-center mt-4 md:mt-2 lg:mt-2 xl:mt-10 px-4 gap-6">
              <input
                ref={inputRef}
                className="border-[1px] border-gray-300 dark:border-gray-600 dark:bg-[#121212] outline-none text-sm px-3 py-2 rounded-2xl dark:shadow w-80"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => searchMusic(term)}
                placeholder="Search songs or artists..."
              />
              <div className="flex gap-2">
                <Darkmode />
                <BellDotIcon className="text-gray-500 rounded-full lg:w-6 lg:h-6" />
              </div>
            </div>

            {/* Dropdown */}
            {results.length > 0 && (
              <ul className="absolute mt-1 w-80 bg-white dark:bg-[#121212] border dark:border-gray-700 rounded shadow-lg max-h-60 overflow-auto z-10 ml-4">
                {results.map((song, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSong(song)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  >
                    {song.trackName} - {song.artistName}
                  </li>
                ))}
              </ul>
            )}

            {/* Main player content */}
            <div className="flex-grow">
              <Main selectedSong={selectedSong} />
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:col-span-4 h-full">
            <SideRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
