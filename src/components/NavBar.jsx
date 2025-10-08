import React from "react";
import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <div>
      <div className=" bg-slate-700  flex items-center p-4 md:p-8 sticky inset-0">
        <p className="">
          <span className="text-yellow-500 font-bold text-md md:text-xl">
            Coin
          </span>
          <span className="text-white font-bold text-md md:text-xl">
            Analytics
          </span>
        </p>
        <Link
          to={"/"}
          className="text-white text-md md:text-xl font-bold  ml-auto hover:text-slate-300 "
        >
          Coin List
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
