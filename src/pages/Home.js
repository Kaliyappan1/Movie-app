import React from "react";
import BannerHome from "../components/BannerHome";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

const Home = () => {

  const trendingData = useSelector((state) => state.movieoData.bannerData);
    const { data :nowPlayingData} = useFetch('/movie/now_playing')
    const { data :topRatedData} = useFetch('/movie/top_rated')
    const { data :popularTvShowData} = useFetch('/tv/popular')
    const { data :upcomingMoviesData} = useFetch('/movie/upcoming')
 


  return (
    <div>
      <BannerHome />
    <HorizontalScrollCard data={trendingData} heading={"Trending"} trending={true}/>
    <HorizontalScrollCard data={nowPlayingData} heading={"Now Playing"} />
    <HorizontalScrollCard data={topRatedData} heading={"Top Rated Movies  Playing"} />
    <HorizontalScrollCard data={popularTvShowData} heading={"Popular Tv Show"} />
    <HorizontalScrollCard data={upcomingMoviesData} heading={"Upcoming Movies"} />
    </div>
  );
};

export default Home;
