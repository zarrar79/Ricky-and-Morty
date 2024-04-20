'use Client';
import React from 'react'
import Link from 'next/link';
export const search = () => {
  return (
    <div className="flex justify-center w-[100%] items-center bg-[black] mt-10">
        {/* input */}
        <div className="rounded border-[2px] border-[solid] border-[#79c187] w-[30%]"><input className="w-[100%] py-2 px-2" type="text" placeholder="Search by status, gender or species"></input></div>
        {/* button */}
        <div className="text-[white] bg-[#6060e0] p-[9.5px]"><button>Search</button></div>
      </div>
  )
}
