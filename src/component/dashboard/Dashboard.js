import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
function Dashboard(props) {
  const { currentUser, logout } = useAuth();
  const [alertCss, setAlertCss] = useState("danger");
  const [error, setError] = useState();
  const history = useHistory();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/Login");
    } catch {
      setError("Failed to Logout");
    }
  }
  return (
    <div className="dashboard_container">
      {error && <div className={alertCss}>{error}</div>}
      Profile:
      <div className="success">Welcome {currentUser?.email} </div>
      <div className="update-btn">
        <Link to="/Update-profile">Update Profile</Link>
      </div>
      <button onClick={handleLogout} className="logout-btn ">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
