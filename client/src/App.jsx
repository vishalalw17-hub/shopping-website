import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import User from "./pages/User";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
  path="/admin/users"
  element={<AdminUsers />}
/>
<Route
  path="/admin/orders"
  element={<AdminOrders />}
/>

<Route
  path="/products/:id"
  element={<ProductDetails />}
/>

<Route
  path="/user"
  element={<User />}
/>
<Route
  path="/admin/products"
  element={<AdminProducts />}
/>
        <Route
  path="/checkout"
  element={<Checkout />}
/>

<Route
  path="/my-orders"
  element={<MyOrders />}
/>

<Route
  path="/admin"
  element={<AdminDashboard />}
/>
        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;