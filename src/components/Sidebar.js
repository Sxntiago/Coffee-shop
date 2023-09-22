import useQuiosco from "@/hooks/useQuiosco";
import Image from "next/image";
import { Category } from "./Category";

export const Sidebar = () => {
  const { categories } = useQuiosco();
  return (
    <>
      <Image width={250} height={100} alt='logo' src='/assets/img/logo.svg' />
      <nav className='mt-10'>
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </nav>
    </>
  );
};
