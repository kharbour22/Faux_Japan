import FoodReview from "./FoodReview";
import { useOutletContext } from "react-router-dom";

function FoodReviewList() {
    const {foodReviews} = useOutletContext()

    const foodreviewComponents = foodReviews.map(foodreview => {
        return <FoodReview key = {foodreview.id} foodreview = {foodreview}/>
    })

    return <ul>{foodreviewComponents}</ul>

}

export default FoodReviewList