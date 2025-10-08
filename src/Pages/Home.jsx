import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { useEffect,useState } from "react";

export const Home = () => {
  const navigator = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  let page = Number(searchParams.get("page"))
  const [pageInput, setPageInput] = useState(page)

  //to prevent from page query param to become smaller than 1
  useEffect(()=>{
    if(page<=0){
      setSearchParams({page : 1})
      setPageInput(1)
    }
  },[page])


  //Debounce logic for page input element
  useEffect(()=>{
    const timeout = setTimeout(()=>{
        setSearchParams({page : pageInput})
      },1000)

    return ()=>clearTimeout(timeout)

  },[pageInput, setSearchParams])


  const { loading, isError, data } = useFetch(`${process.env.REACT_APP_API_URL}/coins/markets?page=${page}`);


  if (loading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <span>Loading info...</span>
      </div> 
    );
  } else if (isError) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <span>Something went wrong...Try refreshing your browser.</span>
      </div>
    );
  } else if(data.length == 0){
     return (
      <div className="h-[80vh] text-white flex items-center justify-center">
        <span>You have seen all availble coins...</span>
      </div>
     )
  } else {
    return (
      <div className="my-20 mx-2 md:mx-4 flex flex-col space-y-10 items-center justify-center">
        <h1 className="font-bolds text-md md:text-xl lg:text-2xl text-white">
          Coins List
        </h1>
        <div className="w-full lg:w-[1000px] 2xl:w-[1300px] overflow-x-auto">
          <table className="w-full rounded-lg text-white">
            <thead>
              <tr>
                <th className="p-8 text-lg italic leading-none border border-solid border-white ">
                  Name
                </th>
                <th className="p-8 text-lg italic leading-none border border-solid border-white">
                  Symbol
                </th>
                <th className="p-8 text-lg italic leading-none border border-solid border-white">
                  Current Price
                </th>
                <th className="p-8 text-lg italic leading-none border border-solid border-white">
                  Highest Price (24H)
                </th>
                <th className="p-8 text-lg italic leading-none border border-solid border-white">
                  Lowest Price (24H)
                </th>
                <th className="p-8 text-lg italic leading-none border border-solid border-white">
                  Price Change (24H)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-300 hover:text-slate-700 hover:cursor-pointer transition-all duration-300"
                    onClick={() => navigator(`/coin/${item.id}`)}
                  >
                    <td className="p-4 text-center text-md md:text-lg border border-solid border-white">
                      <div className="flex justify-center items-center space-x-4">

                      <span>{item.name}</span>
                      <img
                        src={item.image}
                        alt="coinImg"
                        className="w-[20px] h-[20px] "
                        />
                        </div>
                    </td>
                    <td className="p-4 text-center text-md md:text-lg border border-solid border-white">
                      {item.symbol.toUpperCase()}
                    </td>
                    <td className="p-4 text-center text-md md:text-lg border border-solid border-white">
                      {item.currentPrice && item.currentPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="p-4 text-center text-md md:text-lg border border-solid border-white">
                      {item.dayHigh && item.dayHigh.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="p-4 text-center text-md md:text-lg border border-solid border-white">
                      {item.dayLow && item.dayLow.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td className="p-4 text-center text-md md:text-lg border border-solid border-white">
                      {item.priceChange && item.priceChange.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex space-x-4">
          <button
            className={`bg-slate-700  text-white hover:bg-slate-300 hover:text-slate-700 disabled:bg-slate-300 disabled:text-white transition-all duration-300 px-2 py-1 lg:px-4 lg:py-2 rounded-lg`}
            value={page}
            disabled={page === 1}
            onClick={(e) => setPageInput(page - 1)}
          >
            Prev
          </button>
          <button
            className="bg-slate-700  text-white hover:bg-slate-300 hover:text-slate-700 transition-all duration-300 text-md md:text-lg px-2 py-1 lg:px-3 lg:py-2 rounded-lg"
            value={page}
            onClick={(e) => setPageInput(page + 1 )}
          >
            Next
          </button>
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="pageNumber" className="text-white text-center">Search for page:</label>
          <input id="pageNumber" className="outline-none rounded-md" type="number" min={1} value={pageInput} onChange={(e)=>setPageInput(e.target.value)}/>
        </div>
      </div>
    );
  }
};
