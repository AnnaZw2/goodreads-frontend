import { Link } from "react-router-dom";
import { AddToShelf } from "../../pages/Home/addToShelf";



export function Book({ title, cover, description, author,id ,style}) {
 

  return (
  
<div className="flex mb-40  ml-48 mr-48 p-8 border rounded-xl bg-white" >
      <img src={cover} className={` ${style.imgHeight} w-26`} />
     

      <div className="flex flex-col ml-5">
        <h3 className="header-3">{title}</h3>
        <p className="text-lg mb-6">by {author}</p>
        <div className="rating-container">

</div>

        <Link className="links" to={`/details/${id}`} >More ...</Link>
        <AddToShelf />
        <div>{description}</div>
      </div>
    </div>
  
  );
}
