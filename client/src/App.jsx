import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectRoute from "./components/ProtectRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import User from "./pages/User";
import ProductDetails from "./pages/ProductDetails";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* ================= USER PROTECTED ROUTES ================= */}

        <Route
          path="/checkout"
          element={
            <ProtectRoute>
              <Checkout />
            </ProtectRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectRoute>
              <MyOrders />
            </ProtectRoute>
          }
        />

        <Route
          path="/user"
          element={
            <ProtectRoute>
              <User />
            </ProtectRoute>
          }
        />


        {/* ================= ADMIN PROTECTED ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectRoute adminOnly={true}>
              <AdminProducts />
            </ProtectRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectRoute adminOnly={true}>
              <AdminOrders />
            </ProtectRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectRoute adminOnly={true}>
              <AdminUsers />
            </ProtectRoute>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;