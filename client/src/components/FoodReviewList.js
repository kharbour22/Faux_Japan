import { useState } from "react";
import FoodReview from "./FoodReview";
import { useOutletContext } from "react-router-dom";

function FoodReviewList() {
    const {foodReviews} = useOutletContext();
    const [filter, setFilter] = useState("");

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredReviews = foodReviews.filter(foodreview =>
        foodreview.food.name.toLowerCase().includes(filter.toLowerCase())
    );

    const foodreviewComponents = filteredReviews.map(foodreview => (
        <FoodReview key={foodreview.id} foodreview={foodreview}/>
    ));

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <div className="w-full max-w-xs" style={{ backgroundImage: `url(/assets/Scales.png)`, backgroundSize: 'cover', padding: '8px', borderRadius: '5px' }}> 
                <input
                    type="text"
                    placeholder="Filter by food name..."
                    value={filter}
                    onChange={handleChange}
                    className="mb-4 p-2 w-full border border-black rounded"
                />
            </div>
            <ul className="flex flex-wrap justify-center w-full">
                {foodreviewComponents}
            </ul>
        </div>
    );
}

export default FoodReviewList;
