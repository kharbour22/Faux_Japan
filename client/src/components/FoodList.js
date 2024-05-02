import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Food from "./Food";

function FoodList() {
    const { foods, user } = useOutletContext();
    const [showGlutenFree, setShowGlutenFree] = useState(false);

    
    const toggleGlutenFree = () => {
        setShowGlutenFree(!showGlutenFree);
    };

    const filteredFoods = showGlutenFree ? foods.filter(food => food.gluten_free) : foods;

    const foodsComponents = filteredFoods.map(food => (
        <div key={food.id} className="p-4 mb-4">
            <div className="shadow-md rounded-md overflow-hidden">
                <div className="flex items-center">
                    <div className="mr-4">
                        <img src={food.image} alt={food.name} className="rounded-md w-40 h-40 object-cover" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">{food.name}</h2>
                        <p className="text-gray-600">{food.description}</p>
                        <p className="text-gray-800 font-semibold">${food.price}</p>
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
                {foodsComponents}
            </div>
        </>
    );
}

export default FoodList;
