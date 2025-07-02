import { useLocation, useNavigate, useParams } from "react-router-dom";

export function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}
