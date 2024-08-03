import { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [data, setData] = useState();
  const [totalPages, setTotalPages] = useState(0);
  const postPerPages = 15;
  const [currentPage, setCurrentPage] = useState(0);

  const handleCurrentPage = (index) => {
    setCurrentPage(index);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${postPerPages}&skip=${
          currentPage * postPerPages
        }`
      );
      setData(response.data.products);
      setTotalPages(Math.ceil(response.data.total / postPerPages));
    }
    fetchData();
  }, [currentPage]);

  return (
    <div>
      <h1 className="font-bold flex justify-center items-center border-b-2 border-black mb-4">
        Products
      </h1>
      <div className="grid grid-cols-5 justify-items-center gap-5">
        {data &&
          data.map((item) => {
            return (
              <div
                key={item.id}
                className="h-96 w-64 bg-slate-100 p-4 overflow-hidden rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              >
                <img
                  src={item.images[0]}
                  alt=""
                  className="w-full h-44 object-fill"
                />
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-sm text-justify">
                  {item.description.substring(0, 150)}...
                </p>
                <p className="text-sm text-right">{item.price}$</p>
              </div>
            );
          })}
      </div>
      <div className="my-4 text-center">
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <button
              onClick={() => handleCurrentPage(index)}
              key={index}
              className="bg-slate-200 m-1 p-3 cursor-pointer shadow-md rounded-lg hover:shadow-lg hover:bg-slate-500 active:bg-blue-600"
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Product };
