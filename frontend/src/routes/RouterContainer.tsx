import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Design from "./Design/Design";

const RouterContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="design" element={<Design />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterContainer;
