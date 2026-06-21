import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 style={{ margin: 0 }}>Inventory System</h2>
      <div className="navbar-links">
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/products" style={styles.link}>Products</Link>
        <Link to="/customers" style={styles.link}>Customers</Link>
        <Link to="/orders" style={styles.link}>Orders</Link>
      </div>
    </nav>
  );
}

const styles = {
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Navbar;