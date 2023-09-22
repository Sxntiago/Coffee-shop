import useQuiosco from "@/hooks/useQuiosco";
import Image from "next/image";
import React from "react";

export const Category = ({ category }) => {
  const { currentCategory, handleClickCategory } = useQuiosco();
  const { name, icon, id } = category;

  const conditional = currentCategory?.id === id;

  return (
    <div
      className={`
        ${conditional ? "bg-amber-400" : ""}
      flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}
    >
      <Image
        width={70}
        height={70}
        alt='icon-img'
        src={`/assets/img/icono_${icon}.svg`}
      />
      <button
        type='button'
        className='text-2xl font-bold hover:cursor-pointer'
        onClick={() => handleClickCategory(id)}
      >
        {name}
      </button>
    </div>
  );
};
