import React from "react";
import { useOutletContext } from "react-router-dom";
import Drink from "./Drink";

function DrinkList() {
    const { drinks, user } = useOutletContext();

    const drinksComponent = drinks.map(drink => (
        <div key={drink.id} className="p-4 mb-4">
            
                <div className="shadow-md rounded-md overflow-hidden">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <img src={drink.image} alt={drink.name} className="rounded-md w-40 h-40 object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{drink.name}</h2>
                            <p className="text-gray-600">{drink.description}</p>
                            <p className="text-gray-800 font-semibold">${drink.price}</p>
                        </div>
                    </div>
                </div>
            
        </div>
    ));

    function displayDrinkInfo() {
        if (user && user.type === 'admin') {
            return <h1>Here are all of the drinks:</h1>;
        } else if (user && user.type === 'user' && drinks.length > 0) {
            return <h1>Here are the drinks that you've reviewed:</h1>;
        } else if (user && user.type === 'user' && drinks.length === 0) {
            return <h1>You haven't reviewed any drinks yet.</h1>;
        } else {
            return null;
        }
    }

    return (
        <>
            <br />
            {user ? displayDrinkInfo() : null}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drinksComponent}
            </div>
        </>
    );
}

export default DrinkList;
