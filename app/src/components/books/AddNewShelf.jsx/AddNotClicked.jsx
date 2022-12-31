import "./../addToShelf.css"

// this is component for view when you open "add new shelf" button and DON'T click "add" option in dropdown menu
// this is the DEFAULT view for opened "add new shelf" dropdown menu
export function AddNotClicked({adding,setAdding}){
  
    return (
        <button className="btn-style text-green hover" onClick={()=> {adding ? setAdding(false) : setAdding(true)}}>Add</button>
    )

}