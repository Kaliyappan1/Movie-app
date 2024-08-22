import React from "react";
import BannerHome from "../components/BannerHome";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

const Home = () => {

  return (
    <div>
      <BannerHome />
    <HorizontalScrollCard heading={"Trending"} />
    </div>
  );
};

export default Home;
