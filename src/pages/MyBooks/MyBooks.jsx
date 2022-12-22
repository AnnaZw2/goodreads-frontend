import { Link } from "react-router-dom"
import { Navbar } from "../../components/navbar"
export function MyBooks() {
    return (
        <div>
            <Navbar />
            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2">My Books</h3>
            <p>Page is not completed yet</p>
            {/* By default will display all books then user can change to their currently reading, read, want to read and finaly to their own shelfs (also there is a button to add more shelfs) */}
            <div className="shelfs flex flex-col g-2">
                <Link to="/mybooks/shelfs/all" className="text-light-brown">All</Link>
                <Link to="/mybooks/shelfs/currentlyreading" className="text-light-brown">Currently reading</Link>
                <Link to="/mybooks/shelfs/currentlyreading" className="text-light-brown">Read</Link>
            </div>

        </div>
    )
}
