import React, { useRef, useEffect } from "react";
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HorizontalScrollCard = ({
  data = [],
  heading,
  trending,
  loadMoreData,
  media_type
}) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrevious = () => {
    containerRef.current.scrollLeft -= 300;
  };

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (
        container.scrollLeft + container.offsetWidth >=
        container.scrollWidth - 10 // Adjust to prevent early triggering
      ) {
        loadMoreData(); // Load more data when the user scrolls to the end
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loadMoreData]);

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-lg font-bold lg:text-2xl mb-3 text-white capitalize">
        {heading}
      </h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll overflow-hidden z-10 relative scroll-smooth transition-all scrollbar-hide"
        >
          {data.map((data, index) => {
            return (
              <Card
                key={data.id + "heading" + index}
                data={data}
                index={index + 1}
                trending={trending}
                media_type={media_type}
              />
            );
          })}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full items-center h-full">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
