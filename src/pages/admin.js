import AdminLayout from "@/components/AdminLayout";
import Order from "@/components/Order";
import axios from "axios";
import useSWR from "swr";

export default function Admin() {
  const fetcher = () =>
    axios.get("/api/orders").then((response) => {
      return response.data;
    });
  const { data, error, isLoading } = useSWR("/api/orders", fetcher, {
    refreshInterval: 300,
  });
  return (
    <AdminLayout page={"Admin"}>
      <h1 className='text-4xl font-black'>Admin Page</h1>
      <p className='text-2xl my-10'>Admin orders</p>

      {data && data.length ? (
        data.map((order) => <Order key={order.id} orderProp={order} />)
      ) : (
        <p>There are no orders to show</p>
      )}
    </AdminLayout>
  );
}
