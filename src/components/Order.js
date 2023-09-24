import { priceFormater } from "@/helpers";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const Order = ({ orderProp }) => {
  const { id, name, total, order } = orderProp;
  const orderComplete = async () => {
    try {
      const datos = await axios.post(`/api/orders/${id}`);
      toast.success("Order completed");
    } catch (error) {
      toast.error("Opps! try again");
    }
  };

  return (
    <div className='border p-10 space-y-5'>
      <h3 className='text-2xl font-bold'>Order: {id}</h3>
      <p className='text-lg font-bold'>Customer: {name}</p>

      <div className=''>
        {order.map((dish) => (
          <div
            key={dish.id}
            className='py-3 flex border-b last-of-type:border-0 items-center'
          >
            <div className='w-32'>
              <Image
                alt={`dish-img-${dish.name}`}
                width={400}
                height={500}
                src={`/assets/img/${dish.image}.jpg`}
              />
            </div>
            <div className='p-5 space-y-2'>
              <h4 className='text-xl font-bold text-amber-500'>{dish.name}</h4>
              <p className='text-lg font-bold'>Qty: {dish.qty}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='md:flex md:items-center md:justify-between my-10'>
        <p className='mt-5 font-black text-4xl text-amber-500'>
          Total: {priceFormater(total)}
        </p>
        <button
          type='button'
          className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 px-10 py-3 uppercase font-bold rounded-md'
          onClick={orderComplete}
        >
          Order Complete
        </button>
      </div>
    </div>
  );
};

export default Order;
