
import Food from "./Food";

function FoodReview({ foodreview }) {
    return (
        <div className="rounded-lg p-4 my-4 max-w-md shadow-lg" > {/* Adjusted classes here */}
            <Food food={foodreview.food} />
            <h2 className="text-xl">Rating: {foodreview.rating}/5</h2>
            <p className="text-gray-700">{foodreview.text}</p>
        </div>
    );
}

export default FoodReview;
