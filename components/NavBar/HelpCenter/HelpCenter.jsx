import React from "react";
import Link from "next/link";

//INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenter = [
    {
      name: "About",
      link: "",
    },
    {
      name: "Contact Us",
      link: "",
    },
    {
      name: "Sign Up",
      link: "",
    },
    {
      name: "LogIn",
      link: "",
    },
    {
      name: "Subscription",
      link: "",
    },
  ];
  return (
    <div className={Style.box}>
      {helpCenter.map((el, i) => (
        <div className={Style.helpCenter} key={i + 1}>
          <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default HelpCenter;
