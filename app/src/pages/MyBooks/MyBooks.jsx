
import { Navbar } from "../../components/navbar"
import {NavigateMyBooks} from "../../components/navigateMyBooks"
export function MyBooks() {
    return (
        <div>
      
            <NavigateMyBooks/>
           
            <h3 className="header-3">My Books</h3>
            <p>Page is not completed yet</p>
            {/* By default will display all books then user can change to their currently reading, read, want to read and finaly to their own shelves (also there is a button to add more shelves) */}
         
        </div>

    )
}
