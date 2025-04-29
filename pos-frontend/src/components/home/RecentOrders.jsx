import React from "react";
import { useState } from 'react';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";
import QuantityButton from "./QuantityButton";
import { FaTrash } from "react-icons/fa";

const RecentOrders = () => {
  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrders();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  const [productsSelected, setProductsSelected] = useState([
    { name: 'Café', price: 30, quantity: 2 },
    { name: 'Pan', price: 15, quantity: 3 },
    { name: 'Sándwich', price: 50, quantity: 1 },
  ]);

  const updateQuantity = (index, newQuantity) => {
    setProductsSelected((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const removeProduct = (index) => {
    setProductsSelected(prev => prev.filter((_, i) => i !== index));
  };

  var totalMount = 0;

  return (
    <div className="px-8">
      <div className="bg-[#1a1a1a] w-full h-[500px] rounded-tl-lg rounded-tr-lg shadow-lg">
        <div className="grid grid-cols-5 bg-white font-bold p-3 text-center rounded-tl-lg rounded-tr-lg">
          <div>Producto</div>
          <div>Precio</div>
          <div>Cantidad</div>
          <div>Subtotal</div>
          <div>Acciones</div>
        </div>

        {productsSelected.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-5 p-2 text-center items-center text-[#f5f5f5] odd:bg-[#1f1f1f] even:bg-[#1a1a1a]"
          >
            <div>{product.name}</div>
            <div>${product.price.toFixed(2)}</div>
            <QuantityButton
              quantity={product.quantity}
              onIncrement={() => updateQuantity(index, product.quantity + 1)}
              onDecrement={() =>
                updateQuantity(index, Math.max(1, product.quantity - 1))
              }
            />
            <div>${(product.price * product.quantity).toFixed(2)}</div>
            <div className="hidden">{ totalMount += product.price * product.quantity }</div>
            <div>
              <button onClick={() => removeProduct(index)}>
                <FaTrash className="inline mr-2 text-red-500 hover:text-red-700 transition-colors"/>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center bg-[#7ec8ca] text-3xl h-[100px] font-semibold tracking-wide text-center rounded-bl-lg rounded-br-lg">
        Total a Pagar: ${(totalMount).toFixed(2)}
      </div>
    </div>
  );
};

export default RecentOrders;
