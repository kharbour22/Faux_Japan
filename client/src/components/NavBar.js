import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"


function NavBar(){
    return(
        <nav>
            <NavLink to ="/">Home</NavLink>
            <NavLink to = "/login">Login</NavLink>
            <NavLink to = "/foods">Food</NavLink>
            

        </nav>
    )
}

export default NavBar