import Food from "./Food";

function FoodReview({ foodreview }) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 my-4 max-w-md ">
            {/* Review Content */}
            <Food food={foodreview.food} />
            <h2 className="text-xl ">Rating: {foodreview.rating}/5</h2>
            <p className="text-gray-600">{foodreview.text}</p>
        </div>
    );
}

export default FoodReview;
