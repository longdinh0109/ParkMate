import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PartnerHome from "../pages/PartnerHome";
import RegisterLot from "../pages/RegisterLot";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<PartnerHome />} />
      <Route path="/register-lot" element={<RegisterLot />} />
    </Routes>
  );
}
