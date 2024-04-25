import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"


function NavBar(){
    return(
        <nav>
            <NavLink to ="/">Home</NavLink>
            <NavLink to = "/login">Login</NavLink>
            

        </nav>
    )
}

export default NavBar