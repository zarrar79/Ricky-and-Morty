// pages/character/[id].js
'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ColorRing } from 'react-loader-spinner'

export default function CharacterPage() {
  const param = useParams();
  const [episodes,setEpisodes] = useState(0);
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${param.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch character data');
        }
        const data = await res.json();
        setCharacter(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  });

  if (!character) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <ColorRing
visible={true}
height="80"
width="80"
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-[100vh] mt-[0.1px]'>
      {/* character */}
      <div className='max-w-[20%] mx-auto flex justify-center pt-[4rem]'>
        <div key={character.id}>
                  <div className='mx-auto'><img className="flex justify-center rounded-l-[5px] rounded-r-[5px]" src={character.image} alt={character.name} /></div>
                  <div className="bg-[#3c3e44] items-center text-center pt-4 pb-4">
                    <div>
                      <div className="text-[25px] font-bold text-[white]">{character.name}</div>
                      <div className="text-[white]">{character.status + ' - ' + character.gender}</div>
                    </div>
                    <div>
                      <div className="text-[#d1cdcd]">Last Known location:</div>
                      <div className="text-[white]"><a href={character.location.url}>{character.location.name}</a></div>
                    </div>
                    <div>
                      <div className="text-[#d1cdcd]">First seen in:</div>
                      <div className="text-[white]"><a href={character.origin.url}>{character.origin.name}</a></div>
                    </div>
                    <div>
                      <div className="text-[#d1cdcd]">Species</div>
                      <div className="text-[white]">{character.species}</div>
                    </div>
                  </div>
                </div>
      </div>
      {/* back button */}
      <Link href={`/`}>
        <div className='flex justify-center'>
        <button className='text-white px-[86.8px] py-3 bg-[#378e37]'>Go to main</button>
        </div>
      </Link>
    </div>
  );
}
