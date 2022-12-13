import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRef, useState } from "react";
import { instance } from "../api/api";
import { useNavigate } from "react-router-dom";

const AddForm = ({ children, ...props }) => {
  // const { id, title, description, price, tags, isSoldOut, photo, thumbnail } =
  //   props.data;

  // console.log(props.data ? `${title}` : "");

  const [thumbnailBase64, setThumbnailBase64] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const thumbnailInput = useRef();
  const photoInput = useRef();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    tags: yup.string(),
  });
  let thumbnail = thumbnailInput.current?.files[0]?.name;

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toBase64 = (img, setState) => {
    const reader = new FileReader();
    if (img !== undefined) {
      reader.readAsDataURL(img);
      reader.addEventListener("load", (e) => {
        setState(e.target.result);
      });
    }
  };

  // const base64ToImg = async () => {};

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await instance.request("/products", {
        method: "post",
        data: {
          ...data,
          thumbnailBase64,
          photoBase64,
        },
      });
      if (res.status === 200) {
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editSubmit = async (data) => {
    console.log(data);

    try {
      const res = await instance.request(`/products/${props.data.id}`, {
        method: "put",
        data: {
          ...data,
          thumbnailBase64,
          photoBase64,
        },
      });
      if (res.status === 200) {
        reset();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="flex flex-col gap-2 max-w-4xl mx-auto"
      onSubmit={handleSubmit(editSubmit)}
    >
      <label htmlFor="title" className="flex gap-2">
        제품 이름
        <span className="text-red-500 text-xs font-light">필수 *</span>
      </label>
      <input
        {...register("title", {
          value: `${props.data ? `${props.data.title}` : ""}`,
        })}
        type="text"
        id="title"
        className="p-2 bg-slate-300 rounded-md"
      />
      <label htmlFor="price" className="flex gap-2">
        제품 가격
        <span className="text-red-500 text-xs font-light">필수 *</span>
      </label>
      <input
        {...register("price", {
          value: `${props.data ? `${props.data.price}` : ""}`,
        })}
        type="text"
        id="price"
        className="p-2 bg-slate-300 rounded-md"
      />
      <label htmlFor="description" className="flex gap-2">
        제품 상세 설명
        <span className="text-red-500 text-xs font-light">필수 *</span>
      </label>
      <textarea
        {...register("description", {
          value: `${props.data ? `${props.data.description}` : ""}`,
        })}
        id="description"
        className="p-2 bg-slate-300 rounded-md resize-none"
      ></textarea>
      <label htmlFor="tags">제품 태그</label>
      <input
        {...register("tags", {
          value: `${props.data ? `${props.data.tags}` : ""}`,
        })}
        type="text"
        id="tags"
        className="p-2 bg-slate-300 rounded-md"
      />
      <label htmlFor="thumbnailBase64">
        제품 썸네일
        {/* <div className="p-2 bg-slate-300 rounded-md py-2">
          {thumbnail ? thumbnail : props.data.thumbnail}
        </div> */}
      </label>
      <input
        {...register("thumbnail")}
        type="file"
        id="thumbnailBase64"
        className="p-2 bg-slate-300 rounded-md"
        ref={thumbnailInput}
        onChange={(e) => {
          // thumbnail = props?.data.thumbnail;
          toBase64(e.target.files[0], setThumbnailBase64);
        }}
      />
      <label htmlFor="photoBase64">제품 상세 사진</label>
      <input
        {...register("photo")}
        type="file"
        id="photoBase64"
        className="p-2 bg-slate-300 rounded-md"
        ref={photoInput}
        onChange={(e) => {
          toBase64(e.target.files[0], setPhotoBase64);
        }}
      />
      <div>
        {children}
        <button
          type="submit"
          className="bg-slate-300 rounded-md mt-4 mx-auto w-16 text-sm py-2 px-2 active:scale-95 transition duration-100 text-white"
        >
          <span className="text-sm">{props.data ? "수정" : "추가"}</span>
        </button>
      </div>
    </form>
  );
};
export default AddForm;
