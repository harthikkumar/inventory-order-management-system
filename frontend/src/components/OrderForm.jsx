import { useState, useEffect } from "react";
import { fetchAllCustomers } from "../api/customers";
import { fetchAllProducts } from "../api/products";

function OrderForm({ onSubmit }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState([{ product_id: "", quantity: 1 }]);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    fetchAllCustomers().then(setCustomers);
    fetchAllProducts().then(setProducts);
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItemRow = () => {
    setItems([...items, { product_id: "", quantity: 1 }]);
  };

  const removeItemRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!customerId) {
      setValidationError("Please select a customer");
      return;
    }
    if (items.some((item) => !item.product_id || item.quantity <= 0)) {
      setValidationError("Please select a product and valid quantity for all rows");
      return;
    }

    onSubmit({
      customer_id: Number(customerId),
      items: items.map((item) => ({
        product_id: Number(item.product_id),
        quantity: Number(item.quantity),
      })),
    });

    // Reset form
    setCustomerId("");
    setItems([{ product_id: "", quantity: 1 }]);
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">
      <h3>Create Order</h3>

      {validationError && <p style={styles.error}>{validationError}</p>}

      <label>Customer</label>
      <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} style={styles.input}>
        <option value="">-- Select Customer --</option>
        {customers.map((c) => (
          <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
        ))}
      </select>

      <label>Products</label>
      {items.map((item, index) => (
        <div key={index} style={styles.itemRow}>
          <select
            value={item.product_id}
            onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
            style={styles.itemSelect}
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name} (Stock: {p.quantity})</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
            style={styles.qtyInput}
          />
          {items.length > 1 && (
            <button type="button" onClick={() => removeItemRow(index)} style={styles.removeBtn}>
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addItemRow} style={styles.addBtn}>
        + Add Another Product
      </button>

      <button type="submit" style={styles.submitBtn}>Create Order</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "450px",
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
  itemRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  itemSelect: {
    flex: 2,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  qtyInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "60px",
  },
  removeBtn: {
    padding: "6px 10px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addBtn: {
    padding: "8px",
    background: "#efdfdf",
    border: "1px dashed #94a3b8",
    borderRadius: "6px",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "10px 16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "5px",
  },
  error: {
    color: "#dc2626",
    fontSize: "14px",
  },
};

export default OrderForm;