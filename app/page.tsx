 export default async function page(){
  const getData = async () => {
      const res = await fetch('https://rickandmortyapi.com/api/character');
      return res.json();
  }

  const data = await getData();
  return (
      <>
      <div className="pt-[0.1px] bg-[black]">
       <div className="flex justify-center w-[100%] items-center bg-[black] mt-10">
        {/* input */}
        <div className="rounded border-[2px] border-[solid] border-[#79c187] w-[30%]"><input className="w-[100%] py-2 px-2" type="text" placeholder="Search by status, gender or species"></input></div>
        {/* button */}
        <div className="text-[white] bg-[#6060e0] p-[9.5px]"><button>Search</button></div>
      </div>
      <div className="pt-[0.1px] bg-[black]">
      <div className="flex flex-wrap justify-between bg-[#333232] px-2 mt-10">
        {data.results.map((card:any) =>(
          // parent
          <div className="mt-4" key={card.id}>
            {/* img left */}
            <div><img src={card.image}></img></div>
            {/* right */}
            <div className="bg-[#3c3e44] items-center text-center pt-4 pb-4">
            {/* head */}
            <div>
              {/* name */}
            <div className="text-[25px] font-bold text-[white]">{card.name}</div>
            {/* status */}
            <div className="text-[white]">{card.status+' - '+card.gender}</div>
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
              <div className="text-[#d1cdcd]">{"Specie"}</div>
              {/* status */}
              <div className="text-[white]">{card.species}</div>
            </div>
            </div>
          </div>
        ))}
        </div>
        </div>
        </div>
      </>
  );
}
