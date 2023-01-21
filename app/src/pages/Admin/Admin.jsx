import { Navbar } from "../../components/navbar";
import { ShowUsers } from "./ShowUsers";
import { ShowBooks } from "./ShowBooks";

function Admin() {

    return (
        <div>
            <Navbar />
            <p>ADMIN PAGE</p>
            <ShowUsers/>
            {/* <ShowBooks/> */}
        </div>


    )
}

export { Admin }