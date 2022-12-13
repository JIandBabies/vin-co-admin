import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../api/api";
import PageTitle from "../components/PageTitle";
import Pagination from "../components/Pagination";

const ProductList = () => {
  const [productLists, setProductLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ListsPerPage] = useState(10);

  useEffect(() => {
    const getProuductLists = async () => {
      try {
        setLoading(true);
        const res = await instance.request("/products", {
          method: "get",
        });

        if (res.status === 200) {
          // console.log(res.data);
          setProductLists(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getProuductLists();
  }, []);
  const indexOfLastList = currentPage * ListsPerPage;
  const indexOfFirstList = indexOfLastList - ListsPerPage;
  const currentList = productLists.slice(indexOfFirstList, indexOfLastList);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <PageTitle>전체 목록 조회</PageTitle>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="grid grid-cols-5 gap-1">
            {currentList.map((productList) => (
              <div
                key={productList.id}
                data-id={productList.id}
                className="border"
              >
                <Link to={`/product/${productList.id}`}>
                  <div>{productList.title}</div>
                  <img width={250} src={productList.thumbnail} alt="" />
                  <div>{productList.price.toLocaleString()}</div>
                </Link>
              </div>
            ))}
          </div>
          <Pagination
            ListsPerPage={ListsPerPage}
            totalLists={productLists.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};
export default ProductList;
