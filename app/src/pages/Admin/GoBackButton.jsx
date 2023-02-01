import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export function GoBack() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const previousRoute = path.slice(0, path.length - 1).join('/');
  console.log(previousRoute);
  return (
    <button
      className="bg-light-gray h-6 rounded-md  mt-4 pl-2 pr-2"
      onClick={() => navigate(previousRoute)}
    >
      Go back
    </button>
  );
}
