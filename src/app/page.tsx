import { flushAllTraces } from "next/dist/trace";
import Image from "next/image";
import "./styles.css";
import Searchbar from "./Components/Searchbar";
import { getAllProducts } from "../../lib/actions";
import ProductCard from "./Components/ProductCard";
const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between relative">
        <section className="hero">
          <div className="p-8 pt-36 min-h-screen flex-col justify-start text-center z-10 relative">
            <h2 className="text-4xl f-heading lg:font-bold">
              <span className="text-5xl">
                Track the <span className=" text-orange-500">Price</span>
              </span>{" "}
              <br></br>
              <span className="">Before</span> buying Anything
            </h2>
            <br></br>
            <h2 className="text-2xl s-heading lg:font-bold text-gray-400 ">
              Get the email notification when price is lowest and why not always
              Buy at
              <span className=" text-orange-500"> Lowest Price !</span>
            </h2>
            <br></br>
            <br></br>
            <Searchbar />
          </div>
        </section>
      </main>
      <section>
        <div className="flex flex-col p-10">
          <div className=" text-3xl mb-10 text-center font-bold">
            Trending Products
          </div>
          <div className="flex flex-wrap gap-10 lg:p-10  ">
            {allProducts?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
