import { useState, useEffect } from "react";

function ProductForm({ onSubmit, editingProduct, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
  });
  const [validationError, setValidationError] = useState("");

  // Agar edit mode hai, form ko existing data se bharo
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        sku: editingProduct.sku,
        price: editingProduct.price,
        quantity: editingProduct.quantity,
      });
    } else {
      setFormData({ name: "", sku: "", price: "", quantity: "" });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    // Basic validation
    if (!formData.name || !formData.sku) {
      setValidationError("Name and SKU are required");
      return;
    }
    if (Number(formData.price) <= 0) {
      setValidationError("Price must be greater than 0");
      return;
    }
    if (Number(formData.quantity) < 0) {
      setValidationError("Quantity cannot be negative");
      return;
    }

    onSubmit({
      name: formData.name,
      sku: formData.sku,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    });

    // Form reset karo (agar add mode hai)
    if (!editingProduct) {
      setFormData({ name: "", sku: "", price: "", quantity: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>

      {validationError && <p style={styles.error}>{validationError}</p>}

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="sku"
        placeholder="SKU / Code"
        value={formData.sku}
        onChange={handleChange}
        disabled={!!editingProduct}
        style={styles.input}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        style={styles.input}
      />

      <div style={styles.actions}>
        <button type="submit" style={styles.submitBtn}>
          {editingProduct ? "Update" : "Add"}
        </button>
        {editingProduct && (
          <button type="button" onClick={onCancelEdit} style={styles.cancelBtn}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  submitBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "8px 16px",
    background: "#e2e8f0",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    fontSize: "14px",
  },
};

export default ProductForm;