'use client'
import { all } from 'axios';
import { Allerta_Stencil, Inclusive_Sans } from 'next/font/google';
import PreviousMap from 'postcss/lib/previous-map';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Page() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPram] = useState(["name", 'gender']);
  const [display, setDisplay] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true); // State to control loading message

  const itemsPerPage = 9;

  useEffect(() => {
    let fetchStartTime = Date.now(); // Record the start time of data fetching

    // Function to fetch data
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
        console.log('Fetched data:', allData); // Log the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        let fetchEndTime = Date.now(); // Record the end time of data fetching
        let fetchDuration = fetchEndTime - fetchStartTime; // Calculate duration of data fetching

        // Show loading message if fetching duration is less than 1000 milliseconds (1 second), otherwise hide it
        console.log('Fetch duration:', fetchDuration);
        setLoading(fetchDuration < 1000 ? false : true);
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
      if (((item.name).toLowerCase().indexOf((e.value).toLowerCase()))>-1){
        return searchPram.some((newItem) => {
          return item[newItem].toString().toLowerCase().includes(e.value.toLowerCase());
        });
      }});
  };
  const searchBtn = (e) => {
    e.preventDefault();
    return data.filter((item) => {
      if (
        item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        item.gender.toLowerCase().includes(e.target.value.toLowerCase())
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
  
  const handleSearch = (e)=>{
    console.log(e.value , "------>e")
    if(e.value==="all"){
      setCurrPage(1);
      setCurrentPage(0);
    displayData = data;
    }
  else{
   displayData =  search(e);
  setDisplay(displayData);
   }
  }
  return (
    <>
    {loading? "Loading Data......":
      <div className="pt-[0.1px] bg-[black]">
        <div className="text-[white] flex justify-center text-[50px] font-[400] mt-3"><h1>Ricky and Morty</h1></div>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-center w-[100%] items-center bg-[black] mt-10">
            <div className="rounded border-[2px] border-[solid] border-[#79c187] w-[30%]">
              <input onChange={(e)=>{handleSearch(e.target)}} className="w-[100%] py-2 px-2" type='text' placeholder="Search by name" />
            </div>
            <div><select onChange={(e) => handleBtn(e)} className="text-white bg-[#6060e0] p-[9.5px] ml-4 rounded">
      <option value="all">Filter by gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="unknown">Unknown</option>
    </select></div>
          </div>
          <div className="pt-[0.1px] bg-[black]">
            <div className="flex flex-wrap items-center justify-between bg-[#333232] px-2 mt-10">
              {displayData?.map((card) => (
                <div className="mt-4" key={card.id}>
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
              pageCount={!display ? Math.ceil(data.length / itemsPerPage):Math.ceil(display.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
            />
          </div>
        )}
      </div>
      }
    </>
  );
}