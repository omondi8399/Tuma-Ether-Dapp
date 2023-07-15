import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
import { DiJqueryLogo } from "react-icons/di";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";
import { Router } from "next/router";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const router = useRouter();

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
  //------HELP CNTEER
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

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <p>
          <a href="/">
            <DiJqueryLogo className={Style.sideBar_box_logo} />
          </a>
        </p>
        <p>
        This is a decentralized application (DApp) that enables users to securely and conveniently transfer Ether (ETH) from one Ethereum account to another.
        </p>
        <div className={Style.sideBar_social}>
          <a href="">
            <TiSocialFacebook />
          </a>
          <a href="">
            <TiSocialLinkedin />
          </a>
          <a href="">
            <TiSocialTwitter />
          </a>
          <a href="">
            <TiSocialYoutube />
          </a>
          <a href="">
            <TiSocialInstagram />
          </a>
        </div>
      </div>

      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>

          {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>

          {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
