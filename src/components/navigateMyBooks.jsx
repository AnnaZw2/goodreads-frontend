import { Link } from "react-router-dom"
import "./NavigateMyBooks.css"
export  function NavigateMyBooks() {
    return (
        <div>
          
<div className="navigate-my-books flex flex-col   w-fit">

{/* shelves */}
<div className="section">
    <p>Bookshelves</p>
    <Link to="/mybooks/shelves/all" className="links">All</Link>
    <Link to="/mybooks/shelves/currentlyreading" className="links">Currently reading</Link>
    <Link to="/mybooks/shelves/read" className="links">Read</Link>
</div>

{/* stats */}
<div className="section border-t-0 hover:underline">
    <Link to="/mybooks/stats" className="links">Stats</Link>
</div>
</div>
        </div>
    )
}

