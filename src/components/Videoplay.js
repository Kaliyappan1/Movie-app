import React, { useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetails";

const Videoplay = ({ data, close, media_type }) => {
  const videoRef = useRef(null);
  const { data: videoData } = useFetchDetails(
    `/${media_type}/${data?.id}/videos`
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (videoRef.current && !videoRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div
        ref={videoRef}
        className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative"
      >
        <button
          onClick={close}
          className="absolute -right-1 -top-6 text-3xl z-50"
        >
          <IoClose />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="w-full h-full"
        />
      </div>
    </section>
  );
};

export default Videoplay;
