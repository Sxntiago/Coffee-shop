import Image from "next/image";
import { priceFormater } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

const Product = ({ product }) => {
  const { handleSetProduct, handleSetModal } = useQuiosco();
  const { name, price, image } = product;

  return (
    <div className='border p-3'>
      <Image
        width={250}
        height={100}
        alt={`product-${name}-img`}
        src={`/assets/img/${image}.jpg`}
      />
      <div className='p-5'>
        <h3 className='text-2xl font-bold'>{name}</h3>
        <p className='mt-5 font-black text-4xl text-amber-500 '>
          {priceFormater(price)}
        </p>
        <button
          type='button'
          className='bg-indigo-600 hover:bg-indigo-800 w-full text-white mt-5 p-3 uppercase font-bold rounded'
          onClick={() => {
            handleSetModal(), handleSetProduct(product);
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Product;
