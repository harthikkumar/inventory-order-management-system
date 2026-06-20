import { useState, useEffect } from "react";
import { fetchAllCustomers, createCustomer, deleteCustomer } from "../api/customers";
import CustomerTable from "../components/CustomerTable";
import CustomerForm from "../components/CustomerForm";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import ConfirmDialog from "../components/ConfirmDialog";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await fetchAllCustomers();
      setCustomers(data);
    } catch (err) {
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async (customerData) => {
    setError("");
    setSuccess("");
    try {
      await createCustomer(customerData);
      setSuccess("Customer added successfully");
      loadCustomers();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteCustomer(deleteId);
      setSuccess("Customer deleted successfully");
      setDeleteId(null);
      loadCustomers();
    } catch (err) {
      setError("Failed to delete customer");
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h1>Customers</h1>

      <ErrorMessage message={error} />
      <SuccessMessage message={success} />

      <CustomerForm onSubmit={handleSubmit} />

      {loading ? <Loader /> : (
        <CustomerTable customers={customers} onDelete={handleDeleteClick} />
      )}

      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this customer?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

export default CustomersPage;