import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL category
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");

      console.log("PRODUCT API RESPONSE:", response.data);

      setProducts(response.data.data || []);
    } catch (error) {
      console.log("Products Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product) => {
    const oldCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = oldCart.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = oldCart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    } else {
      updatedCart = [
        ...oldCart,
        {
          ...product,
          quantity: 1
        }
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(`${product.name} added to cart 🛒`);
  };

  // =========================
  // LOAD PRODUCTS
  // =========================
  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // RESET PAGE WHEN CATEGORY CHANGES
  // =========================
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="products-loading">
        <div className="spinner-border"></div>

        <p>
          Loading products...
        </p>
      </div>
    );
  }

  // =========================
  // CATEGORY FILTER
  // =========================
  const filteredProducts = category
    ? products.filter(
        (product) =>
          product.category?.toLowerCase() ===
          category.toLowerCase()
      )
    : products;

  // =========================
  // PAGINATION
  // =========================
  const totalPages = Math.ceil(
    filteredProducts.length /
      productsPerPage
  );

  const lastProductIndex =
    currentPage * productsPerPage;

  const firstProductIndex =
    lastProductIndex -
    productsPerPage;

  const currentProducts =
    filteredProducts.slice(
      firstProductIndex,
      lastProductIndex
    );

  // =========================
  // CHANGE PAGE
  // =========================
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="products-page">

      <div className="container">

        {/* =========================
            PAGE HEADING
        ========================= */}
        <div className="products-heading">

          <span>
            {category
              ? category.toUpperCase()
              : "SHOP"}
          </span>

          <h1>
            {category
              ? `${category} Products`
              : "Explore Our Products"}
          </h1>

          <p>
            {category
              ? `Discover the best ${category.toLowerCase()} products at great prices.`
              : "Discover amazing products at great prices."}
          </p>

        </div>

        {/* =========================
            PRODUCT COUNT
        ========================= */}
        <div className="products-topbar">

          <span>
            {filteredProducts.length} Products Available
          </span>

          {filteredProducts.length > 0 && (
            <span>
              Page {currentPage} of {totalPages}
            </span>
          )}

        </div>

        {/* =========================
            PRODUCT GRID
        ========================= */}
        <div className="row g-4">

          {filteredProducts.length === 0 ? (

            <div className="empty-products">

              <div>
                🛍️
              </div>

              <h3>
                No Products Available
              </h3>

              <p>
                No products found in{" "}
                <strong>
                  {category || "this category"}
                </strong>.
              </p>

            </div>

          ) : (

            currentProducts.map(
              (product) => (

                <div
                  className="col-12 col-sm-6 col-lg-4 col-xl-3"
                  key={product._id}
                >

                  <ProductCard
                    product={product}
                    onAddToCart={addToCart}
                  />

                </div>

              )
            )

          )}

        </div>

        {/* =========================
            PAGINATION
        ========================= */}
        {totalPages > 1 && (

          <div className="products-pagination">

            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() =>
                changePage(
                  currentPage - 1
                )
              }
            >
              ← Previous
            </button>

            <div className="pagination-numbers">

              {Array.from(
                {
                  length: totalPages
                },
                (_, index) => {

                  const pageNumber =
                    index + 1;

                  return (
                    <button
                      key={pageNumber}
                      className={
                        currentPage ===
                        pageNumber
                          ? "pagination-number active"
                          : "pagination-number"
                      }
                      onClick={() =>
                        changePage(
                          pageNumber
                        )
                      }
                    >
                      {pageNumber}
                    </button>
                  );

                }
              )}

            </div>

            <button
              className="pagination-btn"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                changePage(
                  currentPage + 1
                )
              }
            >
              Next →
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default Products;