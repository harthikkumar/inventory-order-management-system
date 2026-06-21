import { useState, useEffect } from "react";
import { fetchAllProducts } from "../api/products";
import { fetchAllCustomers } from "../api/customers";
import { fetchAllOrders } from "../api/orders";
import StatCard from "../components/StatCard";
import LowStockList from "../components/LowStockList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Teeno API ek saath call karo (parallel — fast hota hai)
        const [productsData, customersData, ordersData] = await Promise.all([
          fetchAllProducts(),
          fetchAllCustomers(),
          fetchAllOrders(),
        ]);
        setProducts(productsData);
        setCustomers(customersData);
        setOrders(ordersData);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Dashboard</h1>
      <ErrorMessage message={error} />

      <div className="cards-grid">
        <StatCard title="Total Products" value={products.length} color="#2563eb" />
        <StatCard title="Total Customers" value={customers.length} color="#16a34a" />
        <StatCard title="Total Orders" value={orders.length} color="#9333ea" />
        <StatCard
          title="Low Stock Items"
          value={products.filter((p) => p.quantity < 5).length}
          color="#dc2626"
        />
      </div>

      <LowStockList products={products} />
    </div>
  );
}

const styles = {
  cardsContainer: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
    
  },
};

export default DashboardPage;