import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import KitchenDashboard from "./pages/KitchenDashboard";
import AIPrediction from "./pages/AIPrediction";
import SalesReport from "./pages/SalesReport";
import Login from "./pages/Login";
import OrderDashboard from "./pages/OrderDashboard";
import MenuManagement from "./pages/MenuManagement";
import Register from "./pages/Register";
import UserManagement from "./pages/UserManagement";
import MyOrders from "./pages/MyOrders";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";

import logoImage from "./assets/sidebar-image.png";

import {
  FaSignOutAlt,
  FaClipboardList,
  FaUser,
  FaUtensils,
  FaRobot,
  FaChartLine,
  FaTasks,
  FaUserCircle,
  FaChevronDown
} from "react-icons/fa";

function Layout() {
  const location = useLocation();
  const role = sessionStorage.getItem("role");
  const username = sessionStorage.getItem("username");

  const logout = () => {
    sessionStorage.clear();
    window.location = "/login";
  };

  const pageText =
    location.pathname === "/my-orders"
      ? "View your order history and check current order status."
      : location.pathname === "/order"
      ? "Browse menu items and place your order quickly."
      : location.pathname === "/sales"
      ? "Track sales performance and daily reports."
      : location.pathname === "/predict"
      ? "AI can predict demand and food quantity."
      : location.pathname === "/menu-management"
      ? "Manage your menu and keep it fresh for your customers."
      : "Welcome to Smart Canteen Dashboard.";

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password")
  ) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    );
  }

  return (
    <div className="layout">

      <div className="sidebar">

        <div className="logo-box">
          <img src={logoImage} alt="TEST LIVE APP" />
        </div>

        <button className="logout-btn" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>

        <hr className="line" />

        <div className="links">

          {role && (
            <Link to="/order" className={location.pathname === "/order" ? "active-link" : ""}>
              <FaUtensils /> Menu
            </Link>
          )}

          {role && (
            <Link to="/my-orders" className={location.pathname === "/my-orders" ? "active-link" : ""}>
              <FaClipboardList /> My Orders
            </Link>
          )}

          <Link to="/profile" className={location.pathname === "/profile" ? "active-link" : ""}>
            <FaUser /> Profile
          </Link>

          {role === "admin" && (
            <>
              <Link to="/menu-management" className={location.pathname === "/menu-management" ? "active-link" : ""}>
                <FaTasks /> Menu Management
              </Link>

              <Link
      to="/users"
      className={location.pathname === "/users" ? "active-link" : ""}
    >
      <FaUser /> User Management
    </Link>

              <Link to="/predict" className={location.pathname === "/predict" ? "active-link" : ""}>
                <FaRobot /> AI Prediction
              </Link>

              <Link to="/sales" className={location.pathname === "/sales" ? "active-link" : ""}>
                <FaChartLine /> Sales Report
              </Link>
            </>
          )}

          {role === "kitchen" && (
            <>
              <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
                <FaTasks /> Order Management
              </Link>

              <Link to="/predict" className={location.pathname === "/predict" ? "active-link" : ""}>
                <FaRobot /> AI Prediction
              </Link>

              <Link to="/sales" className={location.pathname === "/sales" ? "active-link" : ""}>
                <FaChartLine /> Sales Report
              </Link>
            </>
          )}

        </div>
      </div>

      <div className="main">

        <div className="page-header">

          <div className="header-user-box">
            <h1>   </h1>
            <p>{pageText}</p>
          </div>

          <div className="top-profile">
            <FaUserCircle className="top-profile-icon" />

            <div className="top-profile-text">
              <span className="top-name">{username}</span>

              <span className="top-role">
                {role === "admin"
                  ? "Administrator"
                  : role === "kitchen"
                  ? "Head Chef"
                  : "Student"}
              </span>
            </div>

            <FaChevronDown className="top-arrow" />
          </div>

        </div>

        <Routes>
          <Route path="/" element={<KitchenDashboard />} />
          <Route path="/predict" element={<AIPrediction />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/order" element={<OrderDashboard />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;