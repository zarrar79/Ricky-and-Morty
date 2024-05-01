'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ColorRing } from 'react-loader-spinner'

export default function Page() {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPram] = useState(["name", "status"]);
  const [display, setDisplay] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true); // State to control loading message

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let allData = [];
        let nextPage = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
  
        while (nextPage) {
          const res = await fetch(nextPage);
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await res.json();
          allData = [...allData, ...jsonData.results];
          nextPage = jsonData.info.next;
        }
  
        setData(allData);
        console.log('Fetched data:', allData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data regardless of success or failure
      }
    };
  
    fetchData();
  }, [currentPage]);
  


  useEffect(() => {
    console.log('Loading state:', loading);
  }, [loading]);

  let displayData = display ? display?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : data?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: 'smooth'});
  };

  const search = (e) => {
    return data.filter((item) => {
      if (((item.name).toLowerCase().indexOf((e.value).toLowerCase())) > -1) {
        return searchPram.some((newItem) => {
          return item[newItem].toString().toLowerCase().includes(e.value.toLowerCase());
        });
      }
    });
  };
  const searchBtn = (e) => {
    e.preventDefault();
    return data.filter((item) => {
      if (
        item.status.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return searchPram.some((newItem) =>
          item[newItem].toString().toLowerCase().includes(e.target.value.toLowerCase())
        );
      }
    });
  };

  const handleBtn = (e) => {
    setFilter(e.target.value);
    if (e.target.value == "all") {
      setCurrPage(1);
      setCurrentPage(0);
      setDisplay(data); // Assuming `setDisplay` is a state setter function for `displayData`
    } else {
      const filteredData = searchBtn(e);
      setDisplay(filteredData); // Assuming `setDisplay` is a state setter function for `displayData`
    }
  };

  const handleSearch = (e) => {
    console.log(e.value, "------>e")
    if (e.value === "all") {
      setCurrPage(1);
      setCurrentPage(0);
      displayData = data;
    }
    else {
      displayData = search(e);
      setDisplay(displayData);
    }
  }

  return (
    <>
      {loading ? (
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
      ) : (
        <div className="pt-[0.1px] bg-[black]">
          <div className="text-[white] flex justify-center text-[50px] font-[400] mt-3"><h1>Ricky and Morty</h1></div>
          <div className="max-w-[1100px] mx-auto">
            <div className="flex justify-center w-[100%] items-center bg-[black] mt-10">
              <div className="rounded border-[2px] border-[solid] border-[#79c187] w-[30%]">
                <input onChange={(e) => { handleSearch(e.target) }} className="w-[100%] py-2 px-2" type='text' placeholder="Search by name" />
              </div>
              <div><select onChange={(e) => handleBtn(e)} className="text-white bg-[#6060e0] p-[9.5px] ml-4 rounded">
                <option value="all">Filter by status</option>
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select></div>
            </div>
            <div className="pt-[0.1px] bg-[black] min-h-[58vh]">
              <div className="flex flex-wrap justify-around bg-[#333232] px-2 mt-10">
                {displayData.length > 0 ? (
                  displayData.map((card) => (
                    <div className="mt-4" key={card.id}>
                      <Link href={`/pages/character/${card.id}`}>
                        <div><img className="rounded-l-[5px] rounded-r-[5px]" src={card.image} alt={card.name} /></div>
                        <div className="bg-[#3c3e44] items-center text-center pt-4 pb-4">
                          <div>
                            <div className="text-[25px] font-bold text-[white]">{card.name}</div>
                            <div className="text-[white]">{card.status + ' - ' + card.gender}</div>
                          </div>
                          <div>
                            <div className="text-[#d1cdcd]">Last Known location:</div>
                            <div className="text-[white]"><a href={card.location.url}>{card.location.name}</a></div>
                          </div>
                          <div>
                            <div className="text-[#d1cdcd]">First seen in:</div>
                            <div className="text-[white]"><a href={card.origin.url}>{card.origin.name}</a></div>
                          </div>
                          <div>
                            <div className="text-[#d1cdcd]">Species</div>
                            <div className="text-[white]">{card.species}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-white">No characters found</div>
                )}
              </div>
            </div>
          </div>
          {data && (
            <div>
              <ReactPaginate className='flex justify-between max-w-[500px] mx-auto text-white mt-9 pb-9'
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={!display ? Math.ceil(data.length / itemsPerPage) : Math.ceil(display.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
