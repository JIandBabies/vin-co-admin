import AsideBtn from "./AsideBtn";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="p-4 border-2 rounded-md w-40">
      <ul>
        <li>
          <Link to={"/"}>
            <AsideBtn>전체 목록 조회</AsideBtn>
          </Link>
        </li>
        <li>
          <Link to={"/sales/detail"}>
            <AsideBtn>판매 내역</AsideBtn>
          </Link>
        </li>
        <li>
          <Link to={"/sales/cancel"}>
            <AsideBtn>판매 내역 취소</AsideBtn>
          </Link>
        </li>
        <li>
          <Link to={"/product/add"}>
            <AsideBtn>제품 추가</AsideBtn>
          </Link>
        </li>
        <li>
          {/* <Link to={"/product/edit"}>
            <AsideBtn>제품 수정</AsideBtn>
          </Link> */}
        </li>
      </ul>
    </aside>
  );
};
export default Aside;
