import { Link } from "react-router-dom";

function OrderTable({ orders, onDelete }) {
  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Order ID</th>
          <th style={styles.th}>Customer ID</th>
          <th style={styles.th}>Total Amount</th>
          <th style={styles.th}>Status</th>
          <th style={styles.th}>Date</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td style={styles.td}>#{order.id}</td>
            <td style={styles.td}>{order.customer_id}</td>
            <td style={styles.td}>₹{order.total_amount}</td>
            <td style={styles.td}>{order.status}</td>
            <td style={styles.td}>{new Date(order.created_at).toLocaleDateString()}</td>
            <td style={styles.td}>
              <Link to={`/orders/${order.id}`} style={styles.viewBtn}>View</Link>
              <button onClick={() => onDelete(order.id)} style={styles.deleteBtn}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
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
    backgroundColor: "#131415",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #e2e8f0",
  },
  viewBtn: {
    marginRight: "8px",
    padding: "5px 10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "14px",
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

export default OrderTable;