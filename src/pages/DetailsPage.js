import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import { useSelector } from "react-redux";
import moment from "moment";

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );

  console.log("data", data);
  console.log("start cast", castData);

  const duration = (data?.runtime / 60)?.toFixed(1)?.split(".");

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block ">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            className="h-full object-cover w-full"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent "></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit">
          <img
            src={imageURL + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400 ">{data?.tagline}</p>

          <div className="flex items-center my-3 gap-3">
            <p>Rating: {Number(data?.vote_average).toFixed(1)}+</p>

            <span>|</span>

            <p>View : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration : {duration[0]}h {duration[1]}m
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>

            <div className="flex items-center gap-3 my-3 text-center">
              <p>
                Status : {data?.status}
              </p>
              <span>|</span>
              <p>
                Release Date : {moment(data?.release_date).format("MMM Do YYYY")}
              </p>
              <span>|</span>
              <p>
                Revenue : {Number(data?.revenue)}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
