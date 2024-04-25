import React from "react";

function Drink ({drink}) {
    return(
        <div>
            <img src = {drink.image} alt = {drink.name}/>
            <h2>{drink.name}</h2>
            <h2>{drink.description}</h2>
            <h2>{drink.price}</h2>
            <a href = {drink.link}></a>

        </div>
    )
}
export default Drink