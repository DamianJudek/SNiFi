import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";

const RouterContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterContainer;
