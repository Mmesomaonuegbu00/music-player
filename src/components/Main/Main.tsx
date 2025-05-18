 
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineFavorite } from 'react-icons/md';
import {
  PiDotsThree,
  PiPauseFill,
  PiPlayFill,
  PiRepeatFill,
  PiShuffle,
  PiSkipBackFill,
  PiSkipForwardFill,
} from 'react-icons/pi';


type Song = {
  trackName: string;
  artworkUrl100: string;
  previewUrl: string;
  artistName: string;
  trackTimeMillis: number;
  collectionName: string;
};

type MainProps = {
  selectedSong: Song | null;
};

const Main = ({ selectedSong }: MainProps) => {
  const [play, setPlay] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch('/api/search?term=wizkid');
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setSongs(data.results);
        }
      } catch (err) {
        console.error('Failed to fetch songs', err);
      }
    };

    fetchSongs();
  }, []); // ✅ empty is fine here since no dependencies


  useEffect(() => {
  if (selectedSong) {
    setSongs((prevSongs) => [selectedSong, ...prevSongs]);
    setCurrentIndex(0);
    setPlay(true);
  }
}, [selectedSong]);


  useEffect(() => {
    if (!audioRef.current || !songs.length) return;

    const audio = audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    audio.src = songs[currentIndex]?.previewUrl || '';

    if (play) {
      audio.play().catch(err => console.error('Playback error:', err));
    }
  }, [currentIndex, play, songs]);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (play) {
      audio.play().catch(err => console.error("Playback error:", err));
    } else {
      audio.pause();
    }

  }, [play]);

  useEffect(() => {
    let rafId: number;

    const updateProgress = () => {
      const audio = audioRef.current;
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
      rafId = requestAnimationFrame(updateProgress);
    };

    if (play) {
      rafId = requestAnimationFrame(updateProgress);
    }

    return () => cancelAnimationFrame(rafId);
  }, [play]);

  const handleNext = () => {
    if (shuffle) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % songs.length);
    }
  };


  const song = songs[currentIndex];

  if (!song) {
    return <div className="text-center text-gray-500 flex justify-center w-full mx-auto">Loading song...</div>;
  }

  return (
    <div className="flex flex-col items-center h-full w-full pb-10 px-6">
      <audio
        ref={audioRef}
        src={song.previewUrl}
        className="hidden"
        onEnded={() => {
          if (repeat) {
            audioRef.current?.play();
          } else {
            handleNext();
          }
        }}
      />


      <div className="py-3 pb-16 pt-16">
        <p className="text-gray-700 font-semibold text-center">Playlist</p>
        <h1 className="dark:text-gray-300 text-gray-800 font-bold text-xl lg:text-2xl text-center">
          Daily Mix
        </h1>
      </div>

      <div className="flex gap-16 items-center">
        <PiSkipBackFill
          onClick={() => setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length)}
          className="text-green-700 text-4xl  md:text-4xl w-12 h-12  drop-shadow-2xl drop-shadow-green-700 cursor-pointer"
        />

        <div className="relative flex items-center justify-center">
          <p className="xl:w-[200px] xl:h-[200px] rounded-full flex items-center justify-center border-[8px] dark:border-[#0f0f0f] border-black/5 backdrop-blur-2xl">
            <span className="relative xl:w-[180px] xl:h-[180px] rounded-full flex items-center justify-center overflow-hidden">
              <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="49" fill="none" stroke="#00000022" strokeWidth="1" />
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="1"
                  strokeDasharray="307"
                  strokeDashoffset={`${307 - (progress / 100) * 307}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>

              <span className="xl:w-[150px] xl:h-[150px] border-[30px] border-green-950/5 rounded-full flex items-center justify-center relative overflow-hidden">
                <img
                  src={song.artworkUrl100.replace('100x100', '200x200')}
                  alt={song.trackName}
                  className={`w-fit object-cover rounded-full ${play ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '3s' }}
                />
                {play ? (
                  <PiPauseFill
                    onClick={() => setPlay(false)}
                    className="absolute text-2xl lg:text-3xl text-white z-50 bg-green-700 p-2 rounded-full cursor-pointer"
                  />
                ) : (
                  <PiPlayFill
                    onClick={() => setPlay(true)}
                    className="absolute text-2xl lg:text-3xl text-white z-50 bg-green-700 p-2 rounded-full cursor-pointer"
                  />
                )}
              </span>
            </span>
          </p>
        </div>

        <PiSkipForwardFill
          onClick={() => setCurrentIndex((prev) => (prev + 1) % songs.length)}
          className="text-green-700 text-4xl w-12 h-12 md:text-4xl  drop-shadow-2xl drop-shadow-green-700 cursor-pointer"
        />
      </div>

      <div className="flex gap-32 backdrop-blur-xl mt-6">
        <PiShuffle
          onClick={() => setShuffle(!shuffle)}
          className={`md:w-10 md:h-10 lg:w-12 lg:h-12 p-2 rounded-full text-3xl lg:text-4xl cursor-pointer ${shuffle ? 'bg-green-700 text-white' : 'bg-green-700/10 text-green-700'}`}
        />
        <PiRepeatFill
          onClick={() => setRepeat(!repeat)}
          className={`md:w-10 md:h-10 lg:w-12 lg:h-12 p-2 rounded-full text-3xl lg:text-4xl cursor-pointer ${repeat ? 'bg-green-700 text-white' : 'bg-green-700/10 text-green-700'}`}
        />
      </div>
      <p className="border-b-[1px] w-full mt-20 text-gray-300 dark:text-gray-800"></p>

      <div className="mt-4 flex items-center justify-between w-full gap-6 px-4">
        <div className="flex-1 flex justify-start items-center h-8 xl:h-14 gap-1 px-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full bg-green-700 animate-wave ${!play ? 'paused' : ''}`}
              style={{
                height: `${50 + (i % 4) * 20}%`,
                transformOrigin: 'bottom',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div className="flex-1 text-center">
          <div className="font-semibold dark:text-gray-300 text-gray-800 text-[12px] lg:text-xl line-clamp-1 lg:line-clamp-3">{song.trackName}</div>
          <div className="text-[12px] text-gray-600 line-clamp-1 lg:line-clamp-3">{song.artistName}</div>
          <div className="text-[12px] text-gray-400 italic hidden lg:block">{song.collectionName}</div>
          <p className="text-gray-400 text-[10px]">
            {song.trackTimeMillis
              ? `${Math.floor(song.trackTimeMillis / 60000)}:${String(
                Math.floor((song.trackTimeMillis % 60000) / 1000)
              ).padStart(2, '0')}`
              : '0:00'}
          </p>
        </div>

        <div className="flex-1 flex justify-end items-center gap-2 lg:gap-4 text-xl text-gray-600">
          <MdOutlineFavorite className='font-semibold dark:text-gray-300 text-gray-500 w-4 h-4 xl:w-8 xl:h-8' />
          <PiDotsThree className='font-semibold dark:text-gray-300 text-gray-500 w-4 h-4 xl:w-8 xl:h-8' />
        </div>
      </div>

      <div className='px-4'>
        <h2 className='capitalize font-bold text-xl font-sans dark:text-gray-300 text-gray-800 text-left mt-16'>Trending</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 mx-auto">
          {songs.slice(0, 12).map((s, i) => (
            <img
              key={i}
              src={s.artworkUrl100.replace('100x100', '250x250')}
              alt={s.trackName}
              onClick={() => setCurrentIndex(i)}
              className={`cursor-pointer rounded-lg transition-transform duration-200 hover:scale-105 ${i === currentIndex ? 'ring-4 ring-green-700' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
