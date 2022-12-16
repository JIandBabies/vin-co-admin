import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../api/api";
import AddForm from "../components/AddForm";
import PageTitle from "../components/PageTitle";

const EditProduct = () => {
  const { id } = useParams();
  console.log(id);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.request(`products/${id}`, {
        method: "get",
      });
      setLoading(false);
      setData(res.data);
    };
    fetchData();
  }, []);

  const deleteData = async () => {
    const res = await instance.request(`products/${id}`, {
      method: "delete",
    });

    setData(res.data);
    console.log(res.data);
    navigate("/");
  };

  return (
    <div>
      <PageTitle>제품 수정</PageTitle>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <AddForm data={data}>
          <button
            onClick={deleteData}
            className="bg-red-300 rounded-md mt-4 mx-auto w-16 text-sm py-2 px-2 active:scale-95 transition duration-100 text-white mr-4"
          >
            삭제
          </button>
        </AddForm>
      )}
    </div>
  );
};
export default EditProduct;
