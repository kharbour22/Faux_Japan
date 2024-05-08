import Food from "./Food";
import { useOutletContext } from "react-router-dom";

function FoodReview({ foodreview }) {
    const { deleteFoodReview, user } = useOutletContext();
    
    // Check if a user is logged in and either has an id of 1 or matches the review user id.
    const canDelete = user && (user.id === 1 || user.id === foodreview.user_id);

    return (
        <div className="rounded-lg p-4 my-4 max-w-md shadow-lg flex flex-col" > 
            <Food food={foodreview.food} />
            <h2 className="text-xl">Rating: {foodreview.rating}/5</h2>
            <p className="text-gray-700">{foodreview.text}</p>
            {canDelete && (
                <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteFoodReview(foodreview.id)}
                >
                    Delete Review
                </button>
            )}
        </div>
    );
}

export default FoodReview;
