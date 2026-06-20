import apiClient from "./config";

export const fetchAllOrders = async () => {
  const response = await apiClient.get("/orders/");
  return response.data;
};

export const fetchOrderById = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await apiClient.post("/orders/", orderData);
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await apiClient.delete(`/orders/${id}`);
  return response.data;
};