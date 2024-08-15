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
          <div className="p-8 md:pt-36 pt-12 min-h-screen flex-col justify-start text-center z-10 relative">
            <div className="slide-in-top">
              <h2 className="text-2xl  md:text-4xl font-bold">
                <span className="text-3xl md:text-5xl">
                  Track the <span className=" text-orange-500">Price</span>
                </span>{" "}
                <br></br>
                <span className="">Before</span> buying Anything
              </h2>
              <br></br>
              <h2 className="text-xl md:text-2xl s-heading lg:font-bold text-gray-400 ">
                Get the email notification when price is lowest and always buy
                at
                <span className=" text-orange-500"> Lowest Price !</span>
              </h2>
            </div>
            <br></br>
            <br></br>
            <div className="slide-in-bottom">
              <Searchbar />
            </div>
          </div>
        </section>
      </main>
      <section>
        <div className="flex flex-col px-10 py-16">
          <div className=" text-4xl mb-16 text-center font-bold">
            Trending Products
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
