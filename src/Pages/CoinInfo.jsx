import { useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { useState } from "react";

const CoinInfo = () => {
  const [showMore, setShowMore] = useState(false);
  const params = useParams();
  const { loading, isError, data } = useFetch(
    `${process.env.REACT_APP_API_URL}/coin/${params.id}`
  );

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
  } else {
    return (
      <div className="text-white my-[50px] sm:my-[100px] flex flex-col items-center">
        <div className="mt-[15px] sm:mt-[30px] max-lg:mx-4  max-w-[1000px] overflow-x-auto border border-solid border-white">
          <table className="w-full text-md md:text-lg text-center">
            <tbody>
              <tr>
                <th className="p-2 border border-solid border-white">Coin</th>
                <td className="p-2 border border-solid border-white align-middle">
                  {data.name}
                  <img
                    src={data.img}
                    alt="crypto"
                    className="inline ml-[8px] w-[20px] h-[20px]"
                  />
                </td>
              </tr>
              <tr>
                <th className="p-2 border border-solid border-white">Symbol</th>
                <td className="border border-solid border-white">
                  {String(data.symbol).toUpperCase()}
                </td>
              </tr>
              <tr>
                <th className="p-2 border border-solid border-white">
                  Description
                </th>
                <td className="border border-solid border-white">
                  <span
                    className={`overflow-y-hidden ${
                      !showMore && "line-clamp-3"
                    }`}
                  >
                    {data.desc}
                  </span>{" "}
                  {data.desc ? <button
                    className="text-slate-700 underline"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show less" : "Show more"}
                  </button> : 'None'}
                </td>
              </tr>
              <tr>
                <th className="p-2 border border-solid border-white">
                  Current Price
                </th>
                <td className="p-2 border border-solid border-white">
                  {data.currentPrice && data.currentPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "usd",
                  })}
                </td>
              </tr>
              <tr>
                <th className="p-2 border border-solid border-white">
                  Price Change
                </th>
                <td className="p-2 border border-solid border-white">
                  <ul>
                    <li>
                      24H : {`${data.priceChangePercentages["24H"] && data.priceChangePercentages["24H"]}%`}
                    </li>
                    <li>7D : {`${data.priceChangePercentages["7D"] && data.priceChangePercentages["7D"]}%`}</li>
                    <li>
                      14D : {`${data.priceChangePercentages["14D"] && data.priceChangePercentages["14D"]}%`}
                    </li>
                    <li>1M : {`${data.priceChangePercentages["1M"] && data.priceChangePercentages["1M"]}%`}</li>
                    <li>2M : {`${data.priceChangePercentages["2M"] && data.priceChangePercentages["2M"]}%`}</li>
                    <li>
                      200D : {`${data.priceChangePercentages["200D"] && data.priceChangePercentages["200D"]}%`}
                    </li>
                    <li>
                      1Y : {`${data.priceChangePercentages["1Y"] && data.priceChangePercentages["1Y"]}%`}{" "}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <th className="p-2 border border-solid border-white">
                  High (24H)
                </th>
                <td className="p-2 border border-solid border-white ">
                  {data.dayHigh && data.dayHigh.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
              <tr>
                <th className="p-2 border border-solid border-white">
                  Low (24H)
                </th>
                <td className="p-2 border border-solid border-white">
                  {data.dayLow && data.dayLow.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default CoinInfo;
