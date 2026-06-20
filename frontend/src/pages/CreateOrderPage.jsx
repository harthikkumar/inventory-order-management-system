import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orders";
import OrderForm from "../components/OrderForm";
import ErrorMessage from "../components/ErrorMessage";

function CreateOrderPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (orderData) => {
    setError("");
    try {
      await createOrder(orderData);
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create order");
    }
  };

  return (
    <div>
      <h1>Create New Order</h1>
      <ErrorMessage message={error} />
      <OrderForm onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateOrderPage;