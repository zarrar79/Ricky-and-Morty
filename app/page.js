'use client'
import { all } from 'axios';
import { Allerta_Stencil, Inclusive_Sans } from 'next/font/google';
import PreviousMap from 'postcss/lib/previous-map';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

export default function Page() {
  let [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchPram] = useState(["name"]);
  let[display,setDisplay] = useState('');
  let[currPage,setCurrPage] = useState(1)
  let itemsPerPage = 9;
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
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

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
  const handleSearch = (e)=>{
    console.log(e.value , "------>e")
    if(e.value===""){
console.log(e.value==="" , "value---")
    displayData = data;
    setCurrPage(1)
    console.log(display,"------>empty field");
    }
  else{
   displayData =  search(e);
   console.log(displayData,"-------->display data");
   console.log(currentPage,"----->current page");
   console.log(currPage,"------->page number");
  setDisplay(displayData);
   }
  }
  return (
    <>
      <div className="pt-[0.1px] bg-[black]">
        <div className="text-[white] flex justify-center text-[50px] font-[400] mt-3"><h1>Ricky and Morty</h1></div>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-center w-[100%] items-center bg-[black] mt-10">
            <div className="rounded border-[2px] border-[solid] border-[#79c187] w-[30%]">
              <input onChange={(e)=>{handleSearch(e.target)}} className="w-[100%] py-2 px-2" type='text' placeholder="Search by status, gender or species" />
            </div>
            <div className="text-[white] bg-[#6060e0] p-[9.5px]"><button>Search</button></div>
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
    </>
  );
}