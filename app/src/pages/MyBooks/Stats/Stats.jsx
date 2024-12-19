import { Navbar } from "../../../components/navbar";
import { NavigateMyBooks } from "../navigateMyBooks";
import { BestRating } from "./BestaRating";
import { MostReadBooks } from "./MostReadBooks";
import { NumberReadBooks } from "./NumerReadBooks";
import { PagesRead } from "./PagesRead";
import "./Stats.css"
import { TopReviewers } from "./TopReviewers";
import { TrendingNow } from "./TrendingNow";


export function Stats() {

  return (
    <div>
      <Navbar />
      <div className="flex">

        <NavigateMyBooks />
        <div className="flex justify-center flex-col w-full ml-40 mr-40">

          <div className="separator">
            <NumberReadBooks url="http://localhost:3000/stats/shelves?stat_type=user&shelf_id=63d95bb2e6d2a0a1706cdc8b&limit=5" text="you read" />
            <NumberReadBooks url="http://localhost:3000/stats/shelves?stat_type=global&shelf_id=63d95bb2e6d2a0a1706cdc8b&limit=5" text="all users read together" />
          </div>
          <div className="separator mt-0">
            <PagesRead/>
          </div>
          <div className="separator">
          <MostReadBooks/>
          </div>
          <div className="separator">
          <TrendingNow/>
          </div>
          <div className="separator">
            <BestRating url="http://localhost:3000/stats?sort_direction=desc&limit=5&stat_type=user" text="Books you rated the best" />

            <BestRating url="http://localhost:3000/stats?sort_direction=desc&limit=5&stat_type=global" text="Books all users rated the best" />
          </div>
          <div className="separator">
            <TopReviewers />
          </div>


        </div>
      </div>
    </div>






  );
}
