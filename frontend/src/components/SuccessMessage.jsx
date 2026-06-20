function SuccessMessage({ message }) {
  if (!message) return null;

  return <div style={styles.success}>{message}</div>;
}

const styles = {
  success: {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
    padding: "10px 15px",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "14px",
  },
};

export default SuccessMessage;