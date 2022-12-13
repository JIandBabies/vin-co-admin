import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <section className="p-4 border-2 rounded-md flex-1 ">
      <Outlet />
    </section>
  );
};
export default Section;
