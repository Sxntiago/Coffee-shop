import ProductSummary from "@/components/ProductSummary";
import useQuiosco from "@/hooks/useQuiosco";
import { Layout } from "@/layout/Layout";

export default function Summary() {
  const { order } = useQuiosco();

  return (
    <Layout page='Summary'>
      <h1 className='text-4xl font-black'>Summary</h1>
      <p className='text-2xl my-10'>Check your order</p>
      {order.length === 0 ? (
        <p className='text-center text-2xl'>There are no orders to show</p>
      ) : (
        order.map((product) => (
          <ProductSummary key={product.id} product={product} />
        ))
      )}
    </Layout>
  );
}
