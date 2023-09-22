import useQuiosco from "@/hooks/useQuiosco";
import Image from "next/image";
import { priceFormater } from "@/helpers";
import { useEffect, useState } from "react";
import { CloseIcon, MinusIcon, PlusIcon } from "@/icons/icons";

export const ModalProduct = () => {
  const { product, handleSetModal, handleOrder, order } = useQuiosco();
  const [qty, setQty] = useState(1);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (order.some((orderState) => orderState.id === product.id)) {
      setEdit(true);
      const editProduct = order.find(
        (orderState) => orderState.id === product.id
      );
      setQty(editProduct.qty);
    }
  }, [order, product]);

  return (
    <div className='md:flex gap-10'>
      <div className='md:w-1/3'>
        <Image
          width={300}
          height={400}
          alt={`img-product-${product.name}`}
          src={`/assets/img/${product.image}.jpg`}
        />
      </div>
      <div className='md:w-2/3'>
        <div className='flex justify-end'>
          <button onClick={handleSetModal}>
            <CloseIcon />
          </button>
        </div>
        <h1 className='text-3xl font-bold mt-5'>{product.name}</h1>
        <p className='mt-5 font-black text-5xl text-amber-500'>
          {priceFormater(product.price)}
        </p>
        <div className='flex gap-4 mt-5'>
          <button
            type='button'
            onClick={() => {
              if (qty <= 1) return;
              setQty(qty - 1);
            }}
          >
            <MinusIcon />
          </button>
          <p className='text-3xl'>{qty}</p>
          <button
            type='button'
            onClick={() => {
              if (qty >= 5) return;
              setQty(qty + 1);
            }}
          >
            <PlusIcon />
          </button>
        </div>

        <button
          type='button'
          className='bg-indigo-600 hover:bg-indigo-800 mt-5 text-white uppercase font-bold rounded px-5 py-2'
          onClick={() => handleOrder({ ...product, qty })}
        >
          {edit ? "save changes" : "add to bag"}
        </button>
      </div>
    </div>
  );
};
