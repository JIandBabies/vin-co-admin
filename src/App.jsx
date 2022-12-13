import Aside from "./components/Aside";
import Section from "./components/Section";
import { Routes, Route, Link } from "react-router-dom";
import ProductList from "./pages/ProductList";
import SalesDetails from "./pages/SalesDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import CancelSales from "./pages/CancelSales";

function App() {
  return (
    <>
      <header>
        <h1 className="font-bold px-4 pt-4 text-xl">
          <Link to={"/"}>Vin-co admin</Link>
        </h1>
      </header>
      <main className="p-4 flex gap-4 w-screen h-screen">
        <Aside />
        <Routes>
          <Route element={<Section />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<EditProduct />} />
            <Route path="/sales/detail" element={<SalesDetails />} />
            <Route path="/sales/cancel" element={<CancelSales />} />
            <Route path="/product/add" element={<AddProduct />} />
            {/* <Route path="/product/edit" element={<EditProduct />} /> */}
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
