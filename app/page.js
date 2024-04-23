'use client'
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Page() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await res.json();
  
        setData(prevData => ({
          info: jsonData.info,
          results: prevData ? [...prevData.results, ...jsonData.results] : jsonData.results
        }));
  
        if (jsonData.info && jsonData.info.next) {
          fetchData(jsonData.info.next);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData("https://rickandmortyapi.com/api/character");
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayData = data ? data.results.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : [];

  return (
    <>
      <div className="pt-[0.1px] bg-[black]">
        <div className="text-[white] flex justify-center text-[50px] font-[400] mt-3"><h1>Ricky and Morty</h1></div>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-center w-[100%] items-center bg-[black] mt-10">
            {/* input */}
            <div className="rounded border-[2px] border-[solid] border-[#79c187] w-[30%]"><input className="w-[100%] py-2 px-2" type="text" placeholder="Search by status, gender or species"></input></div>
            {/* button */}
            <div className="text-[white] bg-[#6060e0] p-[9.5px]"><button>Search</button></div>
          </div>
          <div className="pt-[0.1px] bg-[black]">
            <div className="flex flex-wrap items-center justify-between bg-[#333232] px-2 mt-10">
              {displayData.map((card) => (
                // parent
                <div className="mt-4" key={card.id}>
                  {/* img left */}
                  <div><img className="rounded-l-[5px] rounded-r-[5px]" src={card.image} alt={card.name}></img></div>
                  {/* right */}
                  <div className="bg-[#3c3e44] items-center text-center pt-4 pb-4">
                    {/* head */}
                    <div>
                      {/* name */}
                      <div className="text-[25px] font-bold text-[white]">{card.name}</div>
                      {/* status */}
                      <div className="text-[white]">{card.status + ' - ' + card.gender}</div>
                    </div>
                    {/* location */}
                    <div>
                      {/* sm */}
                      <div className="text-[#d1cdcd]">{"Last Known location:"}</div>
                      {/* lg */}
                      <div className="text-[white]"><a href={card.location.url}>{card.location.name}</a></div>
                    </div>
                    {/* last seen */}
                    <div>
                      {/* last seen sm */}
                      <div className="text-[#d1cdcd]">{"First seen in:"}</div>
                      {/* name */}
                      <div className="text-[white]">
                        <a href={card.origin.url}>{card.origin.name}</a>
                      </div>
                    </div>
                    {/* species div */}
                    <div>
                      {/* species */}
                      <div className="text-[#d1cdcd]">{"Species"}</div>
                      {/* status */}
                      <div className="text-[white]">{card.species}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {data && (
          <div>
            <ReactPaginate className='flex justify-between max-w-[500px] mx-auto text-white mt-9 pb-9'
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={Math.ceil(data.results.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
            />
          </div>
        )}
      </div>
    </>
  );
}
