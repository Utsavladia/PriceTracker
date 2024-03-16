import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="fixed z-10 left-0 top-0 flex w-full justify-between lg:flex font-mono border-b border-gray-300 bg-gradient-to-b from-zinc-200  backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit   lg:rounded-xl lg:border overflow-hidden p-6">
      <Link href="/">
        <p className="sd font-mono font-bold text-3xl ">
          PRICE <span className="sd1">TRACKER</span>
        </p>
      </Link>
      <div className="flex w-auto gap-6 justify-evenly items-center mr-6">
        <a className="w-8">
          <FontAwesomeIcon icon={faHeart} />
        </a>
        <a className="w-7">
          <FontAwesomeIcon icon={faUser} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
