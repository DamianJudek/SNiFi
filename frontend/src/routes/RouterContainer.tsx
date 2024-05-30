import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Header from "../components/Header/Header";
import Home from "./Home/Home";
import Design from "./Design/Design";
import Settings from "./Settings/Settings";

const RouterContainer = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="design" element={<Design />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default RouterContainer;
