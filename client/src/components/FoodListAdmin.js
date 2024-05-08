import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Food from "./Food";

function FoodListAdmin() {
    const { foods, user } = useOutletContext();

    const foodsComponents = foods.map(food => (
        <div key={food.id} className="p-4 mb-4">
            <Link to={`/foods/${food.id}`} className="block">
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
            </Link>
        </div>
    ));

    function displayFoodInfo() {
        if (user && user.type === 'admin') {
            return <h1></h1>;
        } else if (user && user.type === 'user' && foods.length > 0) {
            return <h1></h1>;
        } else if (user && user.type === 'user' && foods.length === 0) {
            return <h1>You haven't reviewed any foods yet.</h1>;
        } else {
            return null;
        }
    }

    return (
        <>
            <br />
            {user ? displayFoodInfo() : null}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {foodsComponents}
            </div>
        </>
    );
}

export default FoodListAdmin;
