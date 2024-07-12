import useAuthentication from "hooks/useAuthentication";
import { ComponentProps } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = ComponentProps<"div">;
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuthentication();
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
