function StatCard({ title, value, color }) {
  return (
    <div style={{ ...styles.card, borderLeft: `4px solid ${color}` }}>
      <p style={styles.title}>{title}</p>
      <p style={styles.value}>{value}</p>
    </div>
  );
}

const styles = {
  card: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    minWidth: "180px",
  },
  title: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  value: {
    margin: "8px 0 0 0",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#0f172a",
  },
};

export default StatCard;