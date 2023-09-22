import Product from "@/components/Product";
import useQuiosco from "@/hooks/useQuiosco";
import { Layout } from "@/layout/Layout";
import Image from "next/image";
//import { PrismaClient } from '@prisma/client'

export default function Home() {
  const { currentCategory } = useQuiosco();
  return (
    <Layout page={`${currentCategory?.name} Menu`}>
      <h1 className='text-4xl font-black'>{currentCategory?.name}</h1>
      <p className='text-2xl my-10'>Choose your order below</p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {currentCategory?.products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}

//when i want to show the results right here
// export const getServerSideProps = async () =>{
//   const prisma = new PrismaClient()

//   const categories = await prisma.category.findMany()

//   return{
//     props : {
//       categories
//     }
//   }
//}
