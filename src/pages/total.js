import { priceFormater } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import { Layout } from "@/layout/Layout";

export default function Total() {
  const { order, name, setName, pushOrder, total } = useQuiosco();

  const confirmOrder = () => {
    return order.length === 0 || name === "";
  };

  return (
    <Layout page='Total'>
      <h1 className='text-4xl font-black'>Total order</h1>
      <p className='text-2xl my-10'>Confirm your order please</p>
      <form onSubmit={pushOrder}>
        <div>
          <label
            htmlFor='name'
            className='block uppercase text-slate-800 font-bold text-xl'
          >
            Name:{" "}
          </label>
          <input
            id='name'
            type='text'
            className='bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className='mt-10'>
          <p className='text-2xl'>
            Total: {""}
            <span className='font-bold'>{priceFormater(total)}</span>
          </p>
        </div>
        <div className='mt-5'>
          <input
            type='submit'
            className={`${
              confirmOrder()
                ? "bg-gray-500 hover:cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-800 hover:cursor-pointer"
            } text-center w-full lg:w-auto px-5 py-2 rounded uppercase  font-bold text-white`}
            value='Confirm'
            disabled={confirmOrder()}
          />
        </div>
      </form>
    </Layout>
  );
}
