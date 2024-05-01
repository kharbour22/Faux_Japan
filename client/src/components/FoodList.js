import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Food from "./Food";

function FoodList() {
    const { foods, user } = useOutletContext();

    const foodsComponents = foods.map(food => (
        <div key={food.id} className="p-4 mb-4">
            <Link to={`/foods/${food.id}`} className="block">
                <div className="border border-black rounded-md p-4">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <img src={food.image} alt={food.name} className="rounded-md" />
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
            return <h1>Here are all of the foods:</h1>;
        } else if (user && user.type === 'user' && foods.length > 0) {
            return <h1>Here are the foods that you've reviewed:</h1>;
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
            <div>{foodsComponents}</div>
        </>
    );
}

export default FoodList;
