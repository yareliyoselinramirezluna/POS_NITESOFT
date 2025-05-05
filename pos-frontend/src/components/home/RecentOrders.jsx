import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import QuantityButton from "./QuantityButton";
import { FaTrash } from "react-icons/fa";
import { useCart } from '../../context/CarContext';

const RecentOrders = () => {
  const { cartItems, removeItem } = useCart();

  const [productsSelected, setProductsSelected] = useState(() =>
    cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }))
  );
  
  // Opcional: sincronizar si cambia el carrito global
  useEffect(() => {
    setProductsSelected(
      cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    );
  }, [cartItems]);
  
  const totalMount = productsSelected.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const updateQuantity = (index, newQuantity) => {
    setProductsSelected((prev) =>
      prev.map((product, i) =>
        i === index ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const removeProduct = (index) => {
    const itemToRemove = productsSelected[index];
    removeItem(itemToRemove.id);
    setProductsSelected(prev => prev.filter((_, i) => i !== index));
  };
  

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
