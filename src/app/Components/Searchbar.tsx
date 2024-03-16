"use client";
import React, { FormEvent, useState } from "react";
import { scrapeAndStore } from "../../../lib/actions";
import { url } from "inspector";

const Searchbar = () => {
  const [isLoading, setisLoading] = useState(false);
  const [searchlink, setSearchlink] = useState("");

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

  const handlesubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = checkValidLink(searchlink);
    if (!isValidLink) return alert("PLease Enter a Valid amazon link buddy");

    try {
      setisLoading(true);
      // use the logic to search for the price using scraper
      const product = await scrapeAndStore(searchlink);
    } catch (error) {
      console.log(error);
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
          placeholder="Paste the link of Product of amazon"
          type="text"
          className="px-4 py-4 rounded-xl text-sm w-80 lg:w-1/2 lg:text-xl  text-black"
          value={searchlink}
          onChange={(e) => setSearchlink(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 lg:px-8 py-4 lg:text-xl font-bold bg-orange-500 rounded-xl"
        >
          {isLoading ? "searching..." : "search"}
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
