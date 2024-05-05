import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "./Home/Home";
import Design from "./Design/Design";

const RouterContainer = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="design" element={<Design />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default RouterContainer;
