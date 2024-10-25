"use client";
import { useEffect, useState } from "react";
import Link from "next/link";


function MediaList() {
  const [media, setMedia] = useState<jsonData[]>([]);
  useEffect(() => {
      const getMediaData = async () => {
              const mediaResponse = await fetch("/data.json");
              const mediaData = await mediaResponse.json();
              setMedia(mediaData);
         
      };
      getMediaData();
  }, []);
  return (
      <div className="flex flex-col items-center">
          {media.map((mediaEntry, index) => (
              <MediaElementDisplay key={index} element={mediaEntry} />
          ))}
      </div>
  );
}


interface jsonData {
  title: string;
  artist: string;
  genre: string;
  released: string;
  link: string;
}

interface jsonDataDisplayProps {
  element: jsonData;
}


function MediaElementDisplay({ element }: jsonDataDisplayProps) {
    const [infoRevealed, setInfoRevealed] = useState<boolean>(false);

    const toggleInfoRevealed = () => setInfoRevealed(!infoRevealed);

    const buttonClass = "inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition";

    return (
        <div className="border border-gray-600 rounded-lg shadow-md p-4 my-4 mx-auto max-w-md bg-gray-800">
            <h2 className="text-2xl font-semibold text-center text-white">{element.title}</h2>
            <div>
                {!infoRevealed ? (
                    <button onClick={toggleInfoRevealed} className={buttonClass}>
                        Show Details
                    </button>
                ) : (
                    <div className="mt-3 text-left text-white">
                        <p><strong>Genre:</strong> {element.genre}</p>
                        <p><strong>Artist:</strong> {element.artist}</p>
                        <p><strong>Released:</strong> {element.released}</p>
                        <Link href={element.link} className="text-blue-400 underline">
                            More Info
                        </Link>
                        <button onClick={toggleInfoRevealed} className={buttonClass + " mt-2"}>
                            Hide Details
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}


export default function Home() {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-8 text-white">Music Collection!</h1>
            <MediaList />
        </div>
    );
}