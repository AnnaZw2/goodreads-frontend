import { AddToShelf } from "./addToShelf";

export function Book({ title, cover, description, author,id }) {

   

    
    return (
        <div className="flex m-48 p-8 border rounded-xl bg-white">
            <img src={cover} className="h-74 w-26" />

            <div className="flex flex-col ml-5 ">
                <h3 className="header-3">{title}</h3>
                <p className="text-lg mb-6">by {author}</p>
                <AddToShelf id={id}/>
          
                {/* <button className="bg-green text-white cursor-pointer border rounded-md w-48 self-center mb-12 p-3" >Add to shelf</button> */}
                <div>{description}</div>
            </div>
        </div>
    )
}
