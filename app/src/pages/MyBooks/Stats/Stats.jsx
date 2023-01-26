import { Navbar } from "../../../components/navbar";
import { NavigateMyBooks } from "../navigateMyBooks";
import { BestRating } from "./BestaRating";
import { MostReadBooks } from "./MostReadBooks";


export function Stats() {

  return (
    <div>
    <Navbar/>
    <div className="flex">

    <NavigateMyBooks />
    <div className="flex justify-center flex-col w-full ml-40 mr-40">

<div className=" border-b  border-light-gray mt-5 mb-5 p-2">
    <MostReadBooks url="http://localhost:3000/stats/shelves?stat_type=user&shelf_id=63b57c1087ff338dadabb9a2" text="you read"/>
    <MostReadBooks url="http://localhost:3000/stats/shelves?stat_type=global&shelf_id=63b57c1087ff338dadabb9a2" text="all users read together"/>
</div>

  <BestRating url="http://localhost:3000/stats?sort_direction=asc&limit=5" text="Books you rated the best"/>

 <BestRating url="http://localhost:3000/stats?sort_direction=desc&limit=5&stat_type=global" text="Books all users rated the best"/>

    </div>
  </div>
  </div>

  
  
  
  
  
  );
}
