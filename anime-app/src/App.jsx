import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home.jsx";
import Content from "./pages/Content.jsx";
import AdminDash from "./pages/AdminDash.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Content />} />
        <Route path="/adminDashboard" element={<AdminDash />} />
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;
