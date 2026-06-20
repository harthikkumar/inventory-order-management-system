import { useState } from "react";

function CustomerForm({ onSubmit }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError("");

    if (!formData.name || !formData.email || !formData.phone) {
      setValidationError("All fields are required");
      return;
    }
    if (!isValidEmail(formData.email)) {
      setValidationError("Please enter a valid email address");
      return;
    }

    onSubmit(formData);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Add Customer</h3>

      {validationError && <p style={styles.error}>{validationError}</p>}

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        style={styles.input}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        style={styles.input}
      />

      <button type="submit" style={styles.submitBtn}>Add</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "300px",
    padding: "20px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  submitBtn: {
    padding: "8px 16px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  error: {
    color: "#dc2626",
    fontSize: "14px",
  },
};

export default CustomerForm;