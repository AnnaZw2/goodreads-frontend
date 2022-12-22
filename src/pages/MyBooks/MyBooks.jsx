
import { Navbar } from "../../components/navbar"
import {NavigateMyBooks} from "../../components/navigateMyBooks"
export function MyBooks() {
    return (
        <div>
            <Navbar />
            <NavigateMyBooks/>
            <h3 className="font-medium leading-tight text-3xl mt-0 mb-2">My Books</h3>
            <p>Page is not completed yet</p>
            {/* By default will display all books then user can change to their currently reading, read, want to read and finaly to their own shelves (also there is a button to add more shelves) */}
         
        </div>

    )
}
