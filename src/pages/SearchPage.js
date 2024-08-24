import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/search/multi", {
        params: {
          query: location?.search?.slice(3),
          page: page,
        },
      });
      setData((prev) =>
        page === 1 ? response.data.results : [...prev, ...response.data.results]
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setData([]);
    fetchData();
  }, [location?.search]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading]);

  useEffect(() => {
    if (page > 1) fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here"
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>

      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results
        </h3>

        <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
          {data.map((searchData) => (
            <Card
              data={searchData}
              key={searchData.id + "search"}
              media_type={searchData.media_type}
            />
          ))}
        </div>

        {loading && <p>Loading more results...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default SearchPage;
