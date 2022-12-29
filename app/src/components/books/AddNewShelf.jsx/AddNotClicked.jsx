import "./../addToShelf.css"
export function AddNotClicked({adding,setAdding}){

    return (
        <button className="btn-style text-green hover" onClick={()=> {adding ? setAdding(false) :setAdding(true)}}>Add</button>
    )

}