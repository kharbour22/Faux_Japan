import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function StarRating({ rating = 0 }) {
    const safeRating = Math.min(Math.max(0, rating), 5); // Clamp rating to be between 0 and 5
    const filledStars = Math.floor(safeRating); // Using floor to avoid partial stars
    const halfStar = safeRating % 1 >= 0.5 ? 1 : 0; // Determine if a half star is needed
    const emptyStars = 5 - filledStars - halfStar; // Calculate empty stars ensuring non-negative result

    return (
        <div className="flex items-center">
            {Array(filledStars).fill().map((_, i) => <span key={i} className="text-yellow-400">&#9733;</span>)}
            {halfStar === 1 && <span className="text-yellow-400">&#9734;</span>} 
            {Array(emptyStars).fill().map((_, i) => <span key={i} className="text-gray-300">&#9733;</span>)}
            <span className="ml-2 text-sm text-gray-600">({safeRating.toFixed(1)})</span>
        </div>
    );
}

function FoodList() {
    const { foods, user } = useOutletContext();
    const [showGlutenFree, setShowGlutenFree] = useState(false);

    const toggleGlutenFree = () => {
        setShowGlutenFree(!showGlutenFree);
    };

    const filteredFoods = showGlutenFree ? foods.filter(food => food.gluten_free) : foods;

    // Group foods by type (Cool, Hot, and Dessert)
    const groupedFoods = filteredFoods.reduce((acc, food) => {
        if (!acc[food.food_type]) {
            acc[food.food_type] = [];
        }
        acc[food.food_type].push(food);
        return acc;
    }, {});

    // Separate "Cool" and "Hot" items
    const coolFoods = groupedFoods['Cool'] || [];
    const hotFoods = groupedFoods['Hot'] || [];
    const dessertFoods = groupedFoods['Dessert'] || [];

    const foodsComponents = (foodsArr) => foodsArr.map(food => (
        <div key={food.id} className="p-4 mb-4">
            <div className="shadow-md rounded-md overflow-hidden">
                <div className="flex items-center">
                    <div className="mr-4">
                        <img src={food.image} alt={food.name} className="rounded-md w-40 h-40 object-cover" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{food.name}</h3>
                        <p className="text-gray-600">{food.description}</p>
                        <p className="text-gray-800 font-semibold">${food.price}</p>
                        <div className="text-gray-500">
                            {food.average_rating !== null ? (
                                <StarRating rating={food.average_rating} />
                            ) : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <>  
            <div className="flex justify-between items-center p-4">
                {user ? <h1>{user.type === 'admin' ? "Here are all of the foods:" : "Here are the foods that you've reviewed:"}</h1> : null}
                <label htmlFor="toggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id="toggle" type="checkbox" className="sr-only" onChange={toggleGlutenFree} checked={showGlutenFree} />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${showGlutenFree ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-700 font-medium">
                        {showGlutenFree ? 'Show All Foods' : 'Show Gluten-Free Only'}
                    </div>
                </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mt-6 mb-2">Cool Items</h2>
                    <div className="flex flex-wrap">
                        {foodsComponents(coolFoods)}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mt-6 mb-2">Hot Items</h2>
                    <div className="flex flex-wrap">
                        {foodsComponents(hotFoods)}
                    </div>
                </div>
            </div>
            <div>
            <h2 className="text-2xl font-bold mt-6 mb-2">Desserts</h2>
                <div className="flex flex-wrap">
                    {foodsComponents(dessertFoods)}
                </div>
            </div>
        </>
    );
}


export default FoodList;
