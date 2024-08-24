import React, { useRef, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const Videoplay = ({ data, close, media_type }) => {
  const videoRef = useRef(null);
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (videoRef.current && !videoRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(close, 300); // Wait for the animation to complete before closing
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <>
      <section
        className={`fixed top-0 right-0 bottom-0 left-0 z-30 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={videoRef}
          className={` w-full max-h-[80vh] max-w-screen-lg aspect-video relative rounded-2xl shadow-lg transform transition-transform duration-300 ${
            isVisible ? "scale-100" : "scale-75"
          }`}
        >
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(close, 300); // Wait for the animation to complete before closing
            }}
            className="absolute -right-1 -top-6 text-3xl z-50"
          >
            <IoClose />
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
            className="w-full h-full rounded-2xl"
          />
        </div>
      </section>
    </>
  );
};

export default Videoplay;
