import React from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Drink from "./Drink"

function DrinkList() {
    const {drinks, user} = useOutletContext()

    const drinksComponent = drinks.map(drink => (
        <Link key = {drink.id} to = {`/drinks/${drink.id}`}>
            <Drink
                drink = {drink}
            />
        </Link>

    ))

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
            <br/>
            {user ? displayDrinkInfo() : null}
            <ul className="drink-list">{drinksComponent}</ul>
        </>
    )
}
export default DrinkList