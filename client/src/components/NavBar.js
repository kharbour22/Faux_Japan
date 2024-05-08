import React from "react";
import { NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function NavBar({ user, logOutUser }) {
  return (
    <nav
    className="navbar text-white flex justify-between items-center px-6 py-2"
    style={{ backgroundImage: `url(/assets/Wood5.png)`, borderRadius: '0' }}  // Added borderRadius style here
  >
      <div className="flex items-center space-x-4">
        <NavLink to="/">
          <img src="/assets/Battle.webp" alt="Sakanamono Home" className="h-12 hover:opacity-75 transition-opacity duration-300" />
        </NavLink>
        <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/foods">Food</NavLink>
        <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/drinks">Drink</NavLink>
        {user && user.type === "admin" && (
          <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/add_food">Add Food</NavLink>
        )}
        {user && user.type === "admin" && (
          <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/foodsadmin">FoodsAdmin</NavLink>
        )}
        {user && user.type === "admin" && (
          <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/add_drink">Add Drink</NavLink>
        )}
        {user && user.type === "admin" && (
          <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/drinksadmin">DrinksAdmin</NavLink>
        )}
        <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/reviews">Reviews</NavLink>
        {user && user.type === "user" && (
          <NavLink className="font-bold text-border text-lg hover:text-blue-300 transition-colors duration-300" to="/add_review">Add Review</NavLink>
        )}
      </div>

      <div className="flex justify-end items-center space-x-4">
  {!user && (
    <>
      <NavLink className="font-bold text-lg hover:text-blue-300 transition-colors duration-300" to="/login">Login</NavLink>
      <NavLink className="font-bold text-lg hover:text-blue-300 transition-colors duration-300" to="/signup">Signup</NavLink>
    </>
  )}
  {user && (
    <>
      <span className="font-bold text-lg">Welcome, {user.username}</span>
      <button onClick={logOutUser} className="text-white hover:text-blue-300 transition-colors duration-300">
        Log Out
      </button>
    </>
  )}
</div>

    </nav>
  );
}

export default NavBar;
