function ErrorMessage({ message }) {
  if (!message) return null;

  return <div style={styles.error}>{message}</div>;
}

const styles = {
  error: {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    padding: "10px 15px",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "14px",
  },
};

export default ErrorMessage;