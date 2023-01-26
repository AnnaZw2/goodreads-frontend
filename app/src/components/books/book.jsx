import { Link } from "react-router-dom";
import { AddToShelf } from "../../pages/Home/addToShelf";
import StarsRating from 'react-star-rate';
import { useState } from "react";
import ReactStars from 'react-stars'
import Button from 'react-bootstrap/Button';
export function Book({ title, cover, description, author,id ,style}) {
  const [value, setValue] = useState(0);
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  
  return (
  
<div className="flex mb-40  ml-48 mr-48 p-8 h-78 border rounded-xl bg-white" >
      <img src={cover} className={` ${style.imgHeight} w-26`} />
     
      <div>
   
    </div>
      <div className="flex bg-white flex-col ml-5">
        <h3 className="header-3 bg-white">{title}</h3>
        <p className="text-lg bg-white mb-6">by {author}</p>
        <div className="rating-container">

</div>
<Button/>
{/* <StarsRating
className="text-sm h-12"
        value={value}
        onChange={value => {
         handleStar(value)
        }}
      /> */}
      <div className="flex flex-col justify-center items-center">
      <ReactStars
  count={5}
  onChange={ratingChanged}
  size={24}
  value={5}
  color2={'#ffd700'} 
    half={true}
  />
  
        <Link className="links bg-white ml-2" to={`/details/${id}`} >More...</Link>
        <AddToShelf bookId={id} />
        </div>
        <div className="bg-white">{description}</div>
      </div>
    </div>
  
  );
}
