function CustomerTable({ customers, onDelete }) {
  if (customers.length === 0) {
    return <p>No customers found.</p>;
  }

  return (
    <div className="table-wrapper">
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Name</th>
          <th style={styles.th}>Email</th>
          <th style={styles.th}>Phone</th>
          <th style={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td style={styles.td}>{customer.name}</td>
            <td style={styles.td}>{customer.email}</td>
            <td style={styles.td}>{customer.phone}</td>
            <td style={styles.td}>
              <button onClick={() => onDelete(customer.id)} style={styles.deleteBtn}>
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
  deleteBtn: {
    padding: "5px 10px",
    background: "#dc2626",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CustomerTable;