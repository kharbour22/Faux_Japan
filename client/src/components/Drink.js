import React from "react";

function Drink ({drink}) {
    return(
        <div>
           
            <h2>{drink.name}</h2>
            <h2>{drink.description}</h2>
            <h2>{drink.price}</h2>
           

        </div>
    )
}
export default Drink