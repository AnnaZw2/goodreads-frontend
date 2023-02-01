import { Link } from "react-router-dom";
import { Navbar } from "../../components/navbar";

export function Moderator() {
  return (
    <div className="moderator">
      <Navbar />
      <div className="mt-10">
      <h4 className="header-4">Moderator navigation panel</h4>
        <Link to="/moderator/showcomments" className="admin-links">
            Go to managing comments </Link>
      </div>
    </div>
  );
}