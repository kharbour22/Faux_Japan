import React from "react";

function Food ({food}) {
    return (
        <div>
            
            <h2>{food.name}</h2>
            <h2>{food.description}</h2>
            <h2>{food.price}</h2>
            <a href = {food.link}></a>

        </div>
    )
}
export default Food