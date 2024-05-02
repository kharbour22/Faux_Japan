import React from "react";

function Food({ food }) {
   
    if (!food) {
        return <div>No food data available</div>;
    }

    return (
        <div>
            
            <h2>{food.image}</h2>
            <h1 className="text-2xl font-bold">{food.name}</h1> 
            <h2>{food.description}</h2>
            <h2>{food.price}</h2>
            {/* <a href={food.link}>Link</a> */}
        </div>
    );
}

export default Food;
