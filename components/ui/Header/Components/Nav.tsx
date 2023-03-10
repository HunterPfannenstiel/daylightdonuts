import Hamburger from "components/ui/svg/NavIcons/Hamburger";
import Profile from "components/ui/svg/NavIcons/Profile";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import classes from "./Nav.module.css";
import Link from "next/link";
import Cart from "./Cart";
import MobileMenu from "./MobileMenu";
import useAnimateModal from "@_hooks/animation/useAnimateModal";

interface NavProps {
  sticky?: boolean;
}

const Nav: FunctionComponent<NavProps> = ({ sticky }) => {
  const stick = sticky ? classes.sticky : "";
  const { showModal, playAnimation, handleModal } = useAnimateModal(300);
  const [animateIn, setAnimateIn] = useState(false);
  const handleLoadComplete = () => {
    setAnimateIn(true);
  };
  const animate = animateIn ? classes.animate_in : "";
  return (
    <nav className={classes.navbar + " " + stick}>
      <MobileMenu
        showModal={showModal}
        playAnimation={playAnimation}
        handleModal={handleModal}
      />
      <Hamburger onClick={handleModal} open={showModal} />
      <div className={`${classes.image_container} ${animate}`}>
        <Image
          src="/Images/DAYLIGHTDONUTS.png"
          alt="Daylight Donuts Logo"
          fill
          onLoadingComplete={handleLoadComplete}
        />
      </div>
      <div className={classes.header_links}>
        <ul className={classes.header_list}>
          <li>
            <Link href={"/menu"}>Menu</Link>
          </li>
          <li>
            <a>About Us</a>
          </li>
          <li>
            <a>Delivery</a>
          </li>
        </ul>
        <ul className={classes.header_icons}>
          <li>
            <Profile />
          </li>
          <li>
            <Cart />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
