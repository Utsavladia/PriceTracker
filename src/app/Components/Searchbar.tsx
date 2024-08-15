"use client";
import React, { FormEvent, useState } from "react";
import { scrapeAndStore } from "../../../lib/actions"; // Ensure correct import
import { useRouter } from "next/navigation";

const Searchbar = () => {
  const [isLoading, setisLoading] = useState(false);
  const [searchlink, setSearchlink] = useState("");
  const router = useRouter();

  // Function to validate the Amazon link
  const checkValidLink = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      if (
        hostname.includes("amazon.com") ||
        hostname.includes("amazon") ||
        hostname.includes("amzn") ||
        hostname.endsWith("amazon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };

  // Submit handler
  const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = checkValidLink(searchlink);
    if (!isValidLink) return alert("Please enter a valid Amazon link!");

    try {
      setisLoading(true);
      // Scrape and store the product data
      const product = await scrapeAndStore(searchlink);

      // If product exists, navigate to the product page
      if (product !== null) {
        router.push(`/products/${product._id}`);
      } else {
        console.log("Product could not be found or created.");
      }
    } catch (error) {
      console.error("Error during scraping:", error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handlesubmit}
        className="flex items-center gap-2 lg:gap-4 justify-center mt-12"
      >
        <input
          placeholder="Paste the Amazon product link"
          type="text"
          className="px-4 py-4 rounded-xl text-sm w-80 lg:w-1/2 lg:text-xl text-black"
          value={searchlink}
          onChange={(e) => setSearchlink(e.target.value)}
        />
        <button
          type="submit"
          className={`px-4 lg:px-8 py-4 lg:text-xl font-bold hover:bg-orange-700 ${
            searchlink.length > 0 ? "bg-orange-600" : "bg-gray-500 "
          } bg-orange-500 rounded-xl`}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
