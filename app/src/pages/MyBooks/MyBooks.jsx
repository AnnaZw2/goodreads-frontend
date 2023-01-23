
import { Navbar } from "../../components/navbar"
import { NavigateMyBooks } from "./navigateMyBooks"
export function MyBooks({shelfName,books}) {
    return (
        <div className="flex flex-col min-h-screen">
        <Navbar className="w-full" />
        <div className="flex">
          <NavigateMyBooks  />
          <div className="flex flex-col items-start justify-between w-full ml-12">
            <h3 className="header-3 flex mt-10 justify-center text-center">{shelfName}</h3>
            <div className="flex flex-col items-center h-64">
              {books.length !== 0 ? books.map(el => <img key={el._id} src={el.cover} className="my-1 h-48" ></img>) : null}
            </div>
          </div>
        </div>
      </div>

    )
}
