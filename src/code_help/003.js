import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  let { user } = useAuth();
  let location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
}

import { Routes as Switch, Route } from "react-router-dom";

import { RequireAuth } from "./RequireAuth";
import { SignIn } from "../pages/SignIn";
import { Dashboard } from "../pages/Dashboard";

export function Routes() {
  return (
    <Switch>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Switch>
  );
}