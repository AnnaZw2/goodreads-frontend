import { Link } from "react-router-dom"
export  function NavigateMyBooks() {
    return (
        <div>
          
<div className="navigate-my-books flex flex-col g-2  w-fit">

<div className="shelves  flex flex-col g-2 border border-brown">
    <p>Bookshelves</p>
    <Link to="/mybooks/shelves/all" className="text-light-brown hover:underline">All</Link>
    <Link to="/mybooks/shelves/currentlyreading" className="text-light-brown hover:underline">Currently reading</Link>
    <Link to="/mybooks/shelves/read" className="text-light-brown hover:underline">Read</Link>
</div>

<div className="stats  flex flex-col g-2 border border-brown border-t-0 hover:underline">
    <Link to="/mybooks/stats" className="text-light-brown ">Stats</Link>
</div>
</div>
        </div>
    )
}

