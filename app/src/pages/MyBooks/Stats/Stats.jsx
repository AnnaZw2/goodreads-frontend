import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../../components/navbar";
import { userContext } from "../../../context/userContex";
import { NavigateMyBooks } from "../navigateMyBooks";
import { BestRating } from "./BestaRating";
import { BestUserRating } from "./BestUserRating";

export function Stats() {

  return (
    <div>
    <Navbar/>
    <div className="flex">

    <NavigateMyBooks />
    <div>

  <BestRating url="http://localhost:3000/stats?sort_direction=asc&limit=5" text="Books you rated the best"/>
 <BestRating url="http://localhost:3000/stats?sort_direction=desc&limit=5&stat_type=global" text="Books all users rated the best"/>
    </div>
  </div>
  </div>

  
  
  
  
  
  );
}
