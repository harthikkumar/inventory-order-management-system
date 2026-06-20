import { useState, useEffect } from "react";
import { fetchAllProducts, createProduct, updateProduct, deleteProduct } from "../api/products";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import ConfirmDialog from "../components/ConfirmDialog";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (productData) => {
    setError("");
    setSuccess("");
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setSuccess("Product updated successfully");
        setEditingProduct(null);
      } else {
        await createProduct(productData);
        setSuccess("Product added successfully");
      }
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setError("");
    setSuccess("");
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteId);
      setSuccess("Product deleted successfully");
      setDeleteId(null);
      loadProducts();
    } catch (err) {
      setError("Failed to delete product");
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h1>Products</h1>

      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancelEdit={handleCancelEdit}
      />

      {loading ? <Loader /> : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this product?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default ProductsPage;