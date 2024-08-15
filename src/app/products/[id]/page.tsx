import Image from "next/image";
import React from "react";
import { getProductById } from "../../../../lib/actions";
import { redirect } from "next/navigation";
import Track from "@/app/Components/Track";
import "../../styles.css";

type Props = {
  params: { id: string };
};

async function ProductDetails({ params: { id } }: Props) {
  const Product = await getProductById(id);
  if (!Product) redirect("/");

  return (
    <div className=" flex flex-col md:flex-row gap-1 w-full pt-6 px-6 pb-4 lg:pt-8 lg:px-16 md:pb-24">
      <div className="md:w-1/2 w-full h-[90vh]  max-h-[90vh] rounded-xl overflow-hidden slide-in-left">
        <img
          src={Product.image}
          alt={Product.title}
          className=" object-cover w-full h-full "
        />
      </div>
      <div className="md:w-1/2 w-full bg-white max-h-[90vh]  slide-in-right rounded-xl overflow-auto text-black p-4 flex flex-col  ">
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
          <div className="border-2 shadow-lg bg-orange-400 border-orange-500 md:w-1/3 w-1/2 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2   text-md">Current Price</p>
            {Product.currency}
            {Product.currentPrice}
          </div>
          <div className=" bg-red-500  shadow-lg md:w-1/3 w-1/2 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2 text-md ">Highest Price</p>
            {Product.currency}
            {Product.highestPrice}
          </div>{" "}
          <div className="border-2 shadow-lg border-orange-500 md:w-1/3 w-1/2 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2  text-md">Average Price</p>
            {Product.currency}
            {Product.averagePrice}
          </div>{" "}
          <div className="border-2  shadow-lg   bg-green-500 md:w-1/3 w-1/2 h-auto p-4 text-center font-semibold rounded-lg">
            <p className="mb-2 text-md ">Lowest Price</p>
            {Product.currency}
            {Product.lowestPrice}
          </div>{" "}
        </div>
        <Track productId={id} />

        <div className="ml-2 border-t-2 opacity-80 text-sm mt-12 ">
          <p className="text-lg font-bold mb-4 mt-4">About the Product</p>
          {Product.description.split("\n")}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
