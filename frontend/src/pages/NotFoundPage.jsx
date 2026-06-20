import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go back to Dashboard</Link>
    </div>
  );
}

export default NotFoundPage;