/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";

export default function SideRight() {
    const [results, setResults] = useState<any[]>([]);

    // Auto-run when the component mounts
    useEffect(() => {
        const fetchMusic = async () => {
            const res = await fetch("/api/search?term=afrobeats");
            const data = await res.json();
            setResults(data.results || []);
        };

        fetchMusic(); // run it on page load
    }, []);

    return (
        <div className="p-4 ">
            <h1 className="text-xl font-bold mb-4 xl:pt-6">🎵 Afrobeats from iTunes</h1>

            <div className="mt-14 space-y-4">
                {results.slice(0, 12).map((song, i) => (
                    <div key={i} className="flex items-center gap-6 border-[1px] dark:border-white/5 border-black/5 p-3 rounded-sm">
                        <img src={song.artworkUrl100} alt="" className="w-16 h-16 rounded" />
                        <div className="flex-1">
                            <div className="font-semibold dark:text-gray-300 text-gray-800">{song.trackName}</div>
                            <div className="text-sm text-gray-600">{song.artistName}</div>
                            <p className="text-sm text-green-700 font-bold">
                                {song.trackTimeMillis
                                    ? `${Math.floor(song.trackTimeMillis / 60000)}:${(
                                        (song.trackTimeMillis % 60000) /
                                        1000
                                    )
                                        .toFixed(0)
                                        .padStart(2, "0")}`
                                    : "No duration"}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
