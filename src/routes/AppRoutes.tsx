import { Routes, Route } from "react-router-dom";
import LoginPage from "@/app/page";
import HomePage from "@/app/Home/page";
import { useRouter } from "next/navigation"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}
