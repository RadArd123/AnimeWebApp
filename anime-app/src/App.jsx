import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Login from "./components/pages/Login/Login.jsx";
import Home from "./components/pages/Home.jsx";
import Content from "./components/pages/Content.jsx";

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
      </Routes>
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;