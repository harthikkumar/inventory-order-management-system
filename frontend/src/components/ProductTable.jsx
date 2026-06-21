function ProductTable({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    
     <div className="table-wrapper">
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>SKU</th>
          <th style={styles.th}>Price</th>
          <th style={styles.th}>Quantity</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td style={styles.td}>{product.name}</td>
            <td style={styles.td}>{product.sku}</td>
            <td style={styles.td}>₹{product.price}</td>
            <td style={styles.td}>
              {product.quantity}
              {product.quantity < 5 && (
                <span style={styles.lowStock}> (Low Stock)</span>
              )}
            </td>
            <td style={styles.td}>
              <button onClick={() => onEdit(product)} style={styles.editBtn}>
                Edit
              </button>
              <button onClick={() => onDelete(product.id)} style={styles.deleteBtn}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    textAlign: "left",
    padding: "10px",
    borderBottom: "2px solid #e2e8f0",
    backgroundColor: "#757b87",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
  },
  lowStock: {
    color: "#dc2626",
    fontSize: "12px",
    fontWeight: "bold",
  },
  editBtn: {
    marginRight: "8px",
    padding: "5px 10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "5px 10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ProductTable;