import { Navigate, Outlet } from "react-router-dom";

// Function to check if user is authenticated
const isAuthenticated = () => {
  return localStorage.getItem("accessToken") !== null;
};

// PrivateRoute Component
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
