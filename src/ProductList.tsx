import React, { useState, useEffect, useRef } from "react";

function ProductList() {
  const [products, setProducts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(10); // Số mục hiển thị mỗi lần
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadProducts();
    addScrollListener();
  }, [search]);

  let timeout: any;
  const loadProducts = async () => {
    if (timeout) clearInterval(timeout);
    timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${search}`
        );
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleScroll = () => {
    if (
      containerRef.current &&
      containerRef.current.scrollTop + containerRef.current.clientHeight >=
        containerRef.current.scrollHeight - 100
    ) {
      // Cuộn đến cuối trang
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const addScrollListener = () => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    addScrollListener();
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm thông tin sản phẩm ... "
        className="w-96 h-10 border border-red-300"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        ref={containerRef}
        className="bg-gray-100 px-10 w-full grid grid-cols-7 gap-5"
        style={{ overflowY: "auto", maxHeight: "900px" }} // Để scroll khi danh sách quá dài
      >
        {products?.products
          .slice(0, currentPage * perPage)
          .map((e: any, i: any) => {
            return (
              <div className="w-48  bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 ">
                <a href="#">
                  <img className="rounded-t-lg w-48 h-40  " src={e.thumbnail} />
                </a>
                <div className="p-4 truncate">
                  <a href="#">
                    <h5 className="mb-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white text-left">
                      {e?.brand}
                    </h5>
                  </a>
                  <p className="mb-4 font-normal text-gray-700 dark:text-gray-400 text-left">
                    {e?.description}
                  </p>
                </div>
              </div>
            );
          })}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default ProductList;
