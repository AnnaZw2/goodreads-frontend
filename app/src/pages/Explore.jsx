import { Navbar } from "../components/navbar";
import { useContext} from "react";
import { searchShelfContext } from "../context/searchContext";
import { Link } from "react-router-dom";
export function Explore() {
 
    const {searchValue,searchOutput} = useContext(searchShelfContext)
    console.log("lllklklk",searchOutput)
    return (
        <div>
        <Navbar/>
        <div className="mr-24 ml-24 mt-10">
  <div className="flex flex-wrap">
    {searchOutput.length !== 0 ? searchOutput.map((el) => (
      <div className="w-1/4 p-4">
      <Link className="links" to={`/details/${el._id}`} >
        <img className="w-full  " src={el.cover} alt={el.title} />
        </Link>
      </div>
    )) : null}
  </div>
</div>


            <h3 className="header-3">Explore</h3>
            <p>Page is not completed yet</p>
        </div>
    )
}