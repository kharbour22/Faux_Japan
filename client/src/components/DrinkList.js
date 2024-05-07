import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function DrinkList() {
    const { drinks, user } = useOutletContext();
    

    
    

    const groupedDrinks = drinks.reduce((acc, drink) => {
        if (!acc[drink.drink_type]) {
            acc[drink.drink_type] = [];
        }
        acc[drink.drink_type].push(drink);
        return acc;
    }, {});

    const cocktailDrinks = groupedDrinks['Cocktail'] || [];
    const sakeDrinks = groupedDrinks['Sake'] || [];
    const beerDrinks = groupedDrinks['Beer'] || [];
    

    const drinksComponents = (drinksArr) => drinksArr.map(drink => (
        <div key={drink.id} className="p-4 mb-4 w-full">
            <div className="shadow-md rounded-md overflow-hidden w-full">
                <div className="flex items-center w-full">
                    <div className="mr-4">
                        <img src={drink.image} alt={drink.name} className="rounded-md w-40 h-40 object-cover" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{drink.name}</h3>
                        <p className="text-gray-600">{drink.description}</p>
                        <p className="text-gray-800 font-semibold">${drink.price}</p>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <>
            <div className="flex justify-between items-center p-4">
                
                    
                
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold mt-6 mb-2 pb-2 text-center  underline">Cocktails</h2>
                    <div className="flex flex-wrap">
                        {drinksComponents(cocktailDrinks)}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mt-6 mb-2 pb-2 text-center  underline">Sake</h2>
                    <div className="flex flex-wrap">
                        {drinksComponents(sakeDrinks)}
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mt-6 mb-2 pb-2 text-center  underline ">Beer</h2>
                    <div className="flex flex-wrap">
                        {drinksComponents(beerDrinks)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DrinkList;
