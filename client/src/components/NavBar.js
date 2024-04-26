import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"


function NavBar(){
    return(
        <nav>
            <NavLink to ="/">Home</NavLink>
            <NavLink to = "/login">Login</NavLink>
            <NavLink to = "/foods">Food</NavLink>
            <NavLink to = "/drinks">Drink</NavLink>
            <NavLink to = "/add_food">Add Food</NavLink>
            <NavLink to = "/add_drink">Add Drink</NavLink>
            

        </nav>
    )
}

export default NavBar