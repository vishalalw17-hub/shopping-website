import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search
  const [search, setSearch] = useState("");

  // Category Filter
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Edit Product ID
  const [editId, setEditId] = useState(null);

  // Product Form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
    rating: ""
  });

  // =========================
  // Get Products
  // =========================
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");

      setProducts(response.data.data);
    } catch (error) {
      console.log("Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Admin Check
  // =========================
  useEffect(() => {
    const user =
      JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      window.location.href = "/";
      return;
    }

    fetchProducts();
  }, []);

  // =========================
  // Input Change
  // =========================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // Reset Form
  // =========================
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      stock: "",
      image: "",
      rating: ""
    });

    setEditId(null);
  };

  // =========================
  // Add / Update Product
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        const response = await API.put(
          `/products/${editId}`,
          formData
        );

        alert(
          response.data.message ||
          "Product updated successfully!"
        );
      } else {
        const response = await API.post(
          "/products",
          formData
        );

        alert(
          response.data.message ||
          "Product added successfully!"
        );
      }

      resetForm();

      fetchProducts();

    } catch (error) {
      console.log("Product Save Error:", error);

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  // =========================
  // Edit Product
  // =========================
  const handleEdit = (product) => {
    setEditId(product._id);

    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price || "",
      category: product.category || "",
      brand: product.brand || "",
      stock: product.stock || "",
      image: product.image || "",
      rating: product.rating || ""
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =========================
  // Delete Product
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await API.delete(
        `/products/${id}`
      );

      alert(
        response.data.message ||
        "Product deleted successfully!"
      );

      // If deleting currently edited product
      if (editId === id) {
        resetForm();
      }

      fetchProducts();

    } catch (error) {
      console.log("Delete Error:", error);

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };

  // =========================
  // Categories
  // =========================
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    )
  ];

  // =========================
  // Search + Filter
  // =========================
  const filteredProducts = products.filter(
    (product) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        product.name
          ?.toLowerCase()
          .includes(searchText) ||
        product.brand
          ?.toLowerCase()
          .includes(searchText) ||
        product.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading Products...
      </h3>
    );
  }

  // =========================
  // UI
  // =========================
  return (
    <div className="admin-products-page">

      <div className="container">

        {/* =====================
            Heading
        ====================== */}

        <div className="admin-heading">
          <h1>Product Management</h1>

          <p>
            Add, edit, search and delete
            ShopEasy products
          </p>
        </div>


        {/* =====================
            Add / Edit Form
        ====================== */}

        <div className="admin-product-form">

          <h4>
            {editId
              ? "✏️ Edit Product"
              : "➕ Add New Product"}
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* Product Name */}

              <div className="col-md-6 mb-3">

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Nike Air Max"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Brand */}

              <div className="col-md-6 mb-3">

                <label>
                  Brand
                </label>

                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  placeholder="Nike"
                  value={formData.brand}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Category */}

              <div className="col-md-6 mb-3">

                <label>
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  className="form-control"
                  placeholder="Shoes"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* Price */}

              <div className="col-md-3 mb-3">

                <label>
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  className="form-control"
                  placeholder="4999"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>


              {/* Stock */}

              <div className="col-md-3 mb-3">

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  className="form-control"
                  placeholder="25"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>


              {/* Rating */}

              <div className="col-md-3 mb-3">

                <label>
                  Rating
                </label>

                <input
                  type="number"
                  name="rating"
                  className="form-control"
                  placeholder="4.5"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                />

              </div>


              {/* Image URL */}

              <div className="col-md-9 mb-3">

                <label>
                  Image URL
                </label>

                <input
                  type="text"
                  name="image"
                  className="form-control"
                  placeholder="https://..."
                  value={formData.image}
                  onChange={handleChange}
                />

              </div>


              {/* Description */}

              <div className="col-12 mb-3">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Product description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* Buttons */}

            <button
              type="submit"
              className="btn btn-danger me-2"
            >
              {editId
                ? "Update Product"
                : "Add Product"}
            </button>


            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}

          </form>

        </div>


        {/* =====================
            Search + Filter
        ====================== */}

        <div className="admin-product-tools">

          <div className="row g-3">

            {/* Search */}

            <div className="col-md-8">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search product, brand or category..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* Category */}

            <div className="col-md-4">

              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value
                  )
                }
              >

                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

        </div>


        {/* =====================
            Product List
        ====================== */}

        <div className="admin-product-list">

          <div className="product-list-header">

            <h4>
              All Products
            </h4>

            <span>
              Showing{" "}
              {filteredProducts.length}{" "}
              of {products.length}
            </span>

          </div>


          <div className="table-responsive">

            <table className="table table-bordered align-middle">

              <thead className="table-dark">

                <tr>

                  <th>
                    Image
                  </th>

                  <th>
                    Product
                  </th>

                  <th>
                    Brand
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Rating
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredProducts.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="text-center py-5"
                    >
                      <h5>
                        😔 No Products Found
                      </h5>

                      <p className="text-muted mb-0">
                        Try another search
                        or category.
                      </p>
                    </td>

                  </tr>

                ) : (

                  filteredProducts.map(
                    (product) => (

                      <tr
                        key={product._id}
                      >

                        {/* Image */}

                        <td>

                          <img
                            src={product.image}
                            alt={product.name}
                            width="65"
                            height="65"
                            style={{
                              objectFit: "cover",
                              borderRadius: "8px"
                            }}
                          />

                        </td>


                        {/* Product */}

                        <td>

                          <strong>
                            {product.name}
                          </strong>

                          <small
                            className="d-block text-muted"
                          >
                            ₹{product.price}
                          </small>

                        </td>


                        {/* Brand */}

                        <td>
                          {product.brand}
                        </td>


                        {/* Category */}

                        <td>
                          <span className="badge bg-secondary">
                            {product.category}
                          </span>
                        </td>


                        {/* Price */}

                        <td>

                          <strong>
                            ₹{product.price}
                          </strong>

                        </td>


                        {/* Stock */}

                        <td>

                          {product.stock > 10 ? (

                            <span className="badge bg-success">
                              {product.stock} Available
                            </span>

                          ) : product.stock > 0 ? (

                            <span className="badge bg-warning text-dark">
                              {product.stock} Low Stock
                            </span>

                          ) : (

                            <span className="badge bg-danger">
                              Out of Stock
                            </span>

                          )}

                        </td>


                        {/* Rating */}

                        <td>
                          ⭐ {product.rating || 0}
                        </td>


                        {/* Actions */}

                        <td>

                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() =>
                              handleEdit(product)
                            }
                          >
                            ✏️ Edit
                          </button>


                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                          >
                            🗑️ Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProducts;