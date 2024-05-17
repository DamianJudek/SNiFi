import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Design from "./Design/Design";
import Settings from "./Settings/Settings";

const RouterContainer = () => {
  return (
    <>
      <Header />
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="design" element={<Design />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </>
  );
};

export default RouterContainer;
