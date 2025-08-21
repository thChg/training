import { useNavigate, useParams } from "react-router-dom";

export function NavigationWrapper(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}
