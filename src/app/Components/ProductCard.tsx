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
      <div className=" w-64 overflow-hidden min-h-96 flex flex-col border-2 border-orange-700 rounded-2xl shadow-lg shadow-orange-400">
        <Image
          src={product.image}
          alt={product.title}
          width={260}
          height={200}
          className=""
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
