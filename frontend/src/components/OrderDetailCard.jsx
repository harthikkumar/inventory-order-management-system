function OrderDetailCard({ order }) {
  if (!order) return null;

  return (
    <div style={styles.card}>
      <h2>Order #{order.id}</h2>
      <p><strong>Customer ID:</strong> {order.customer_id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
      <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>

      <h3>Items</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Product ID</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Unit Price</th>
            <th style={styles.th}>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id}>
              <td style={styles.td}>{item.product_id}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>₹{item.unit_price}</td>
              <td style={styles.td}>₹{(item.unit_price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    maxWidth: "500px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    textAlign: "left",
    padding: "8px",
    borderBottom: "2px solid #e2e8f0",
    backgroundColor: "#070808",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #e2e8f0",
  },
};

export default OrderDetailCard;