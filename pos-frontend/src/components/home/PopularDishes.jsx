import React from "react";
import { getProducts as products } from "../https";
import { FaSearch } from "react-icons/fa";

const PopularDishes = () => {
  return (
    <div className="mt-6 pr-6">
      <div className="bg-[#1a1a1a] w-full rounded-lg">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Productos
          </h1>
          <a href="" className="text-[#025cca] text-sm font-semibold">
            View all
          </a>
        </div>
        
        {/* SEARCH */}
        <div className="flex gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mr-6 ml-6 mb-10">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Escanear/Buscar producto"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5]"
          />
        </div>

        <div className="overflow-y-scroll h-[680px] scrollbar-hide">
          {products.map((product) => {
            return (
              <div
                key={product.id}
                className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mt-4 mx-6"
              >
                <h1 className="text-[#f5f5f5] font-bold text-xl mr-4">{product.id < 10 ? `0${product.id}` : product.id}</h1>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div>
                  <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{product.name}</h1>
                  <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                    <span className="text-[#ababab]">Orders: </span>
                    {product.numberOfOrders}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
