import { Navigate } from "react-router-dom";

function MemberRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "MEMBER") {
    return <Navigate to="/" />;
  }

  return children;
}

export default MemberRoute;
