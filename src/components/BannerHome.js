import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerData.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalRef.current);
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentImage((prev) => (prev + 1) % bannerData.length);
      stopAutoSlide();  // Stop the auto slide when manually clicked
      startAutoSlide(); // Restart the auto slide after manual click
    }
  };

  const handlePrevious = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentImage((prev) => (prev - 1 + bannerData.length) % bannerData.length);
      stopAutoSlide();  // Stop the auto slide when manually clicked
      startAutoSlide(); // Restart the auto slide after manual click
    }
  };

  useEffect(() => {
    const transitionEnd = () => {
      setIsTransitioning(false);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("transitionend", transitionEnd);
    }

    startAutoSlide(); // Start the auto slide when the component mounts

    return () => {
      stopAutoSlide(); // Clean up the interval when the component unmounts
      if (container) {
        container.removeEventListener("transitionend", transitionEnd);
      }
    };
  }, [bannerData.length]);

  return (
    <section className="w-full h-full">
      <div ref={containerRef} className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => (
          <div
            key={data.id + "bannerHome" + index}
            className={`min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-transform duration-1000`}
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <div className="w-full h-full">
              <img
                src={imageURL + data.backdrop_path}
                className="h-full object-cover w-full"
                alt={data.title || data.name}
              />
            </div>

            {/* Buttons for next and previous images */}
            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-4 group-hover:lg:flex">
              <button
                onClick={handlePrevious}
                className="bg-white p-1 rounded-full text-xl z-10 text-black "
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-white p-1 rounded-full text-xl z-10 text-black"
              >
                <FaAngleRight />
              </button>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
            <div className="container mx-auto">
              <div className="w-full absolute bottom-0 max-w-md px-3">
                <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                  {data?.title || data?.name}
                </h2>
                <p className="text-ellipsis line-clamp-3 my-2">
                  {data.overview}
                </p>
                <div className="flex items-center gap-4">
                  <p>Rating: {Number(data.vote_average).toFixed(1)} +</p>
                  <span>|</span>
                  <p>View: {Number(data.popularity).toFixed(0)} +</p>
                </div>
                <button className="px-4 py-2 text-black font-bold rounded mt-4 bg-white hover:bg-gradient-to-l from-red-500 to-orange-500 shadow-md transition-all hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;
