import React from "react";
import BannerHome from "../components/BannerHome";
import HorizontalScrollCard from "../components/HorizontalScrollCard";

import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieoData.bannerData);
  const { data: nowPlayingData, loadMoreData: loadMoreNowPlaying } = useFetch(
    "/movie/now_playing"
  );
  const { data: topRatedData, loadMoreData: loadMoreTopRated } = useFetch(
    "/movie/top_rated"
  );
  const { data: popularTvShowData, loadMoreData: loadMorePopularTvShow } =
    useFetch("/tv/popular");
  const { data: upcomingMoviesData, loadMoreData: loadMoreUpcomingMovies } =
    useFetch("/movie/upcoming");

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trendingData}
        heading={"Trending"}
        trending={true}
        loadMoreData={loadMoreNowPlaying}
      />
      <HorizontalScrollCard
        data={nowPlayingData}
        heading={"Now Playing"}
        loadMoreData={loadMoreNowPlaying}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={topRatedData}
        heading={"Top Rated Movies"}
        loadMoreData={loadMoreTopRated}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={popularTvShowData}
        heading={"Popular Tv Show"}
        loadMoreData={loadMorePopularTvShow}
        media_type={"tv"}
      />
      <HorizontalScrollCard
        data={upcomingMoviesData}
        heading={"Upcoming Movies"}
        loadMoreData={loadMoreUpcomingMovies}
        media_type={"movie"}
      />
    </div>
  );
};

export default Home;
