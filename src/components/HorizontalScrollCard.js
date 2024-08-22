import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const HorizontalScrollCard = ({ heading }) => {
    const trendingData = useSelector((state) => state.movieoData.bannerData);
  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-lg font-bold lg:text-2xl mb-3 text-white">
       {heading}
      </h2>

      <div className="overflow-hidden">
        <div className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll">
          {trendingData.map((data, index) => {
            return (
              <Card
                key={data.id+"heading"+index}
                data={data}
                index={index + 1}
                trending={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
