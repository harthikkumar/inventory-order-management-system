function LowStockList({ products }) {
  const lowStockProducts = products.filter((p) => p.quantity < 5);

  if (lowStockProducts.length === 0) {
    return <p style={styles.noData}>No low stock products. All good!</p>;
  }

  return (
    <div style={styles.container}>
      <h3>Low Stock Alerts</h3>
      <ul style={styles.list}>
        {lowStockProducts.map((p) => (
          <li key={p.id} style={styles.item}>
            <strong>{p.name}</strong> — only {p.quantity} left
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#d6b98d",
    border: "1px solid #fed7aa",
    borderRadius: "8px",
    maxWidth: "400px",
  },
  list: {
    margin: 0,
    paddingLeft: "20px",
  },
  item: {
    marginBottom: "5px",
    color: "#d1603b",
  },
  noData: {
    color: "#16a34a",
    marginTop: "20px",
  },
};

export default LowStockList;   