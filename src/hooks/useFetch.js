import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(endpoint, {
        params: { page },
      });
      setLoading(false);
      if (res.data.results.length === 0) {
        setHasMore(false); // Stop fetching if no more data
      } else {
        setData((prevData) => [...prevData, ...res.data.results]);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData(page); // Fetch data on initial load
  }, [page]);

  const loadMoreData = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment the page number to load more data
    }
  };

  return { data, loading, loadMoreData };
};

export default useFetch;
