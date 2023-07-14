import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "",
    },
    {
      name: "Search",
      link: "",
    },
    {
      name: "Author Profile",
      link: "",
    },
    {
      name: "NFT Details",
      link: "",
    },
    {
      name: "Account Setting",
      link: "",
    },
    {
      name: "Upload NFT",
      link: "",
    },
    {
      name: "Connect Wallet",
      link: "",
    },
    {
      name: "Blog",
      link: "",
    },
  ];
  return (
    <div>
      {discover.map((el, i) => (
        <div key={i + 1} className={Style.discover}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Discover;
