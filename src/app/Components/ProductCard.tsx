import React from "react";
import { Product } from "../../../types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`}>
      <div className=" overflow-hidden h-96 flex flex-col border-2 border-orange-600 rounded-2xl hover:shadow-lg hover:shadow-orange-400 transition-all duration-300 ease-in-out">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-2/3 overflow-hidden hover:scale-110 transition-all duration-300 ease-in-out object-cover"
        />
        <div className="text-black p-2 bg-white flex-1 flex-col">
          <span className=" text-md overflow-hidden line-clamp-2">
            {product.title}
          </span>
          <div className="font-bold text-lg mt-2">
            <span>{product.currency}</span>
            <span> {product.currentPrice}</span>
            <span className="text-sm font-normal ml-2 opacity-70">
              MRP:<span className=" line-through">{product.originalPrice}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
