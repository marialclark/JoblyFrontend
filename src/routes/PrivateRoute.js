import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** PrivateRoute
 *
 * Renders child routes if a user is logged in; otherwise, redirects to /login.
 */
function PrivateRoute() {
  const currentUser = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
