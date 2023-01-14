
import { useParams } from "react-router-dom"
import { Navbar } from "../../../components/navbar"
import { NavigateMyBooks } from "../navigateMyBooks"
export function Shelf() {
    const {name} = useParams()
    console.log(name)
    return (
        <div>
        <Navbar/>
           <NavigateMyBooks />
          
            <h3 className="header-3">{name}</h3>
            <p>Page is not completed yet</p>
           
        </div>
    )
}