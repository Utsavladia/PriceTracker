import Image from "next/image";
import React from "react";
import { getProductById } from "../../../../lib/actions";
import { redirect } from "next/navigation";
import Track from "@/app/Components/Track";

type Props = {
  params: { id: string };
};

async function ProductDetails({ params: { id } }: Props) {
  const Product = await getProductById(id);
  if (!Product) redirect("/");

  return (
    <div className=" flex gap-1 w-full pt-6 px-6 pb-4 lg:pt-24 lg:px-16">
      <div className="w-1/2  max-h-[90vh] rounded-xl overflow-hidden">
        <Image
          src={Product.image}
          alt={Product.title}
          width={700}
          height={700}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="w-1/2 bg-white max-h-[90vh]  rounded-xl overflow-auto text-black p-4 flex flex-col  ">
        <h1 className="text-xl font-bold mt-4 ml-2 border-b-2 pb-4">
          {Product.title}
          <br />
          <a href={Product.url} className="text-sm mt-2 opacity-50">
            Visit Product
          </a>
        </h1>
        <div className="mt-4 ml-2 font-bold text-xl gap-1 flex ">
          <span>{Product.currency}</span>
          <span>{Product.currentPrice}</span>
          <span className="text-sm flex ml-2 mt-1 font-normal  ">
            M.R.P:
            <span className="ml-1 line-through">
              {Product.currency}
              {Product.originalPrice}
            </span>
          </span>
        </div>
        <div className="flex flex-wrap gap-5 mt-8 mb-8 p-2">
          <div className="border-2 shadow-lg bg-orange-400 border-orange-500 w-1/3 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2   text-md">Current Price</p>
            {Product.currency}
            {Product.currentPrice}
          </div>
          <div className=" bg-red-500  shadow-lg w-1/3 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2 text-md ">Highest Price</p>
            {Product.currency}
            {Product.highestPrice}
          </div>{" "}
          <div className="border-2 shadow-lg border-orange-500 w-1/3 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2  text-md">Average Price</p>
            {Product.currency}
            {Product.averagePrice}
          </div>{" "}
          <div className="border-2  shadow-lg   bg-green-500 w-1/3 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2 text-md ">Lowest Price</p>
            {Product.currency}
            {Product.lowestPrice}
          </div>{" "}
        </div>
        <Track />

        <div className="ml-2 border-t-2 opacity-80 text-sm mt-12 ">
          <p className="text-lg font-bold mb-4 mt-4">About the Product</p>
          {Product.description.split("\n")}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
