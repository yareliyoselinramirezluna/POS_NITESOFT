import React from "react";
import { getProducts } from "../../https/index";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FaSearch, FaPlusCircle } from "react-icons/fa";
import { useSnackbar } from 'notistack';
import { useCart } from '../../context/CarContext';

const PopularDishes = () => {
  const { addItem } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: products = [],
    isError,
    isLoading
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
  });
  
  React.useEffect(() => {
    if (isError) enqueueSnackbar("Algo salió mal!", { variant: "error" });
  }, [isError, enqueueSnackbar]);

  if (isLoading) {
    return <p className="text-center mt-10">Cargando productos…</p>;
  }

  return (
    <div className="mt-6 pr-6">
      <div className="bg-[#1a1a1a] h-[690px] w-full rounded-lg">
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

        <div className="overflow-y-scroll h-[480px] scrollbar-hide">
          {products.data.map((product, idx) => {
            const actualProduct = { name: product.name, price: product.price, quantity: 1 };
            return (
              <div key={product._id} className="flex items-center justify-between bg-[#1f1f1f] rounded-[15px] px-6 py-4 mt-4 mx-6">
                {/* Contenedor izquierdo */}
                <div className="flex items-center gap-4">
                  <h1 className="text-[#f5f5f5] font-bold text-xl">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</h1>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-[50px] h-[50px] rounded-full"
                  />
                  <div>
                    <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{product.name}</h1>
                    <p className="text-[#f5f5f5] text-sm font-semibold mt-1">
                      <span className="text-[#ababab]">Stock: </span>
                      {product.stock}
                    </p>
                  </div>
                </div>

                {/* Botón a la derecha */}
                <div>
                  <button onClick={() => addItem(actualProduct)}>
                    <FaPlusCircle className="text-[#20b333] text-2xl" />
                  </button>
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