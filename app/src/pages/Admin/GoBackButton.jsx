import { useNavigate } from "react-router-dom";
export function GoBack() {
  const navigate = useNavigate();
  return (
    <button
      className="bg-light-gray h-6 rounded-md  mt-4 pl-2 pr-2"
      onClick={() => navigate("/admin")}
    >
      Go back
    </button>
  );
}
