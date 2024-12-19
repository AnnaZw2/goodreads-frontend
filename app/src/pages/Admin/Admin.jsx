import { Navbar } from "../../components/navbar";
import { Link } from "react-router-dom";
import "./Admin.css";
import "./../../index.css";

function Admin() {
  return (
    <div>
      <Navbar />

      <div className="mt-10">
        <h4 className="header-4">Admin navigation panel</h4>
        <Link to="/admin/showusers" className="admin-links">
          Go to managing users
        </Link>
        <Link to="/explore" className="admin-links">
          Go to managing books
        </Link>
        <Link to="/admin/showcomments" className="admin-links">
          Go to managing comments
        </Link>
        <Link to="/admin/forms" className="admin-links">
          Add new book
        </Link>
      </div>
    </div>
  );
}

export { Admin };
