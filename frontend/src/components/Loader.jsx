function Loader() {
  return (
    <div style={styles.container}>
      <p>Loading...</p>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    color: "#64748b",
  },
};

export default Loader;