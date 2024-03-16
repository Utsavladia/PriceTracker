"use client";
import React, { FormEvent, MouseEvent, useState } from "react";

const Track = () => {
  const [email, setemail] = useState("");
  const [isPanelVisible, setisPanelVisible] = useState(false);
  const [isSubmitting, setisSubmitting] = useState(false);
  const handleclick = () => {
    setisPanelVisible(true);
  };
  const handleOutsideClick = (e: any) => {
    if (e.target === e.currentTarget) setisPanelVisible(false);
  };

  const handleTrack = async (e: FormEvent<HTMLFormElement>) => {
    setisSubmitting(true);
    e.preventDefault();
    //await addUserEamilToProduct(productId, email);

    setisSubmitting(false);
    setemail("");
    setisPanelVisible(false);
  };
  return (
    <div>
      <button
        onClick={handleclick}
        className="w-3/4 font-semibold  bg-black p-3 text-xl rounded-3xl text-white "
      >
        Track
      </button>
      {isPanelVisible && (
        <div
          onClick={handleOutsideClick}
          className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div className="bg-white rounded-lg  w-1/3 flex flex-col p-6 shadow-lg">
            <h1 className="text-xl mb-1 font-bold">
              Get the Lower Price alert on your email!
            </h1>
            <p className="opacity-50">
              Never miss the bargain with my timely alret!
            </p>
            <h2 className="ml-1 mb-1 font-semibold text-gray-400 text-sm mt-6">
              Email address
            </h2>
            <form onSubmit={handleTrack}>
              <input
                id="email"
                required
                type="email"
                placeholder="Enter your email address"
                className="border-2 py-2 px-4 rounded-xl w-full mb-2"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full p-2 bg-black rounded-xl text-white mt-4"
              >
                {isSubmitting ? "Submitting..." : "Track"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Track;
