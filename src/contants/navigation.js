import { MdHome } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionFill/>
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiMoviePlay />
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <MdHome />

  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icon: <IoSearchOutline/>
  }
]