import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchOrderById } from "../api/orders";
import OrderDetailCard from "../components/OrderDetailCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrderById(id)
      .then(setOrder)
      .catch(() => setError("Order not found"))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div>
      <Link to="/orders">← Back to Orders</Link>
      <h1>Order Details</h1>
      <ErrorMessage message={error} />
      {loading ? <Loader /> : <OrderDetailCard order={order} />}
    </div>
  );
}

export default OrderDetailPage;