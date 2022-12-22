import { Navbar } from "../../../components/navbar"
import { NavigateMyBooks } from "../../../components/navigateMyBooks"

export function CurrentlyReading() {
    return (
        <div>
        <Navbar/>
    <NavigateMyBooks/>
            <h3 className="header-3">Currently reading</h3>
            <p>Page is not completed yet</p>
        </div>
    )
}