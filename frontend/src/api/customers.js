import apiClient from "./config";

export const fetchAllCustomers = async () => {
  const response = await apiClient.get("/customers/");
  return response.data;
};

export const createCustomer = async (customerData) => {
  const response = await apiClient.post("/customers/", customerData);
  return response.data;
};

export const deleteCustomer = async (id) => {
  const response = await apiClient.delete(`/customers/${id}`);
  return response.data;
};