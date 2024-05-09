import { useState, useContext } from "react";
import FoodReview from "./FoodReview";
import { useOutletContext } from "react-router-dom";

function FoodReviewList() {
    const { foodReviews, user } = useOutletContext();
    const [filter, setFilter] = useState("");
    const [showOnlyMyReviews, setShowOnlyMyReviews] = useState(false);

    const handleChange = (event) => {
        setFilter(event.target.value);
    };

    const handleToggle = () => {
        setShowOnlyMyReviews(prev => !prev);
    };

    const filteredReviews = foodReviews.filter(foodreview => {
        const matchesFoodName = foodreview.food.name.toLowerCase().includes(filter.toLowerCase());
        if (showOnlyMyReviews) {
            return matchesFoodName && foodreview.user_id === user.id;
        }
        return matchesFoodName;
    });

    const foodreviewComponents = filteredReviews.map(review => (
        <FoodReview key={review.id} foodreview={review} />
    ));

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <div className="w-full max-w-xs" style={{ backgroundImage: `url(/assets/Nori.png)`, backgroundSize: 'cover', padding: '8px', borderRadius: '5px' }}>
                <input
                    type="text"
                    placeholder="Search by food name..."
                    value={filter}
                    onChange={handleChange}
                    className="mb-4 p-2 w-full border border-black rounded"
                />
                {user && ( 
                    <div className="mb-4 relative">
                        <button
                            onClick={handleToggle}
                            className={`relative inline-flex items-center justify-start p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-opacity-90 focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50 ${showOnlyMyReviews ? 'bg-yellow-200' : 'bg-gray-200'} hover:bg-yellow-200 transition-colors duration-300`}
                        >
                            <span className={`translate-x-0 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1 block w-4 h-4 bg-white rounded-full ${showOnlyMyReviews ? 'translate-x-5' : ''}`}></span>
                        </button>
                        <span className="ml-2 text-white text-border font-bold text-xl">{showOnlyMyReviews ? 'All Reviews' : 'My Reviews'}</span>
                    </div>
                )}
            </div>
            <ul className="flex flex-wrap justify-center w-full">
                {foodreviewComponents}
            </ul>
        </div>
    );
}

export default FoodReviewList;
