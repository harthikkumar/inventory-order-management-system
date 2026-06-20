import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllOrders, deleteOrder } from "../api/orders";
import OrderTable from "../components/OrderTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import ConfirmDialog from "../components/ConfirmDialog";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteOrder(deleteId);
      setSuccess("Order deleted successfully");
      setDeleteId(null);
      loadOrders();
    } catch (err) {
      setError("Failed to delete order");
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1>Orders</h1>
        <Link to="/orders/new" style={styles.newBtn}>+ Create Order</Link>
      </div>

      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      {loading ? <Loader /> : (
        <OrderTable orders={orders} onDelete={handleDeleteClick} />
      )}

      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this order?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  newBtn: {
    padding: "8px 16px",
    background: "#16a34a",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default OrdersPage;