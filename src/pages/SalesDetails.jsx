import { useEffect, useState } from "react";
import { instance } from "../api/api";
import PageTitle from "../components/PageTitle";

const SalesDetails = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSalesDetails = async () => {
      try {
        setLoading(true);
        const res = await instance.request("/products/transactions/all");

        if (res.status === 200) {
          setData(res.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSalesDetails();
  }, []);

  return (
    <div>
      <PageTitle>판매 내역</PageTitle>
      {loading && <h1>Loading...</h1>}
    </div>
  );
};
export default SalesDetails;
