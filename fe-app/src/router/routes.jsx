import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import Playfair from "../pages/playfair/playfair";
import RSA from "../pages/rsa/rsa";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/playfair" element={<Playfair />} />
      <Route path="/rsa" element={<RSA />} />
    </Routes>
  );
};

export default AppRoutes;
