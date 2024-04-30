import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"


function NavBar({user, logOutUser}){
    return(
        <nav className="navbar">
            <NavLink to ="/">Home</NavLink>
            <NavLink to = "/foods">Food</NavLink>
            <NavLink to = "/drinks">Drink</NavLink>
            {user && user.type === 'admin' && <NavLink to = "/add_food">Add Food</NavLink>}
            {user && user.type === 'admin' &&<NavLink to = "/add_drink">Add Drink</NavLink>}
            <NavLink to = "/reviews">Reviews</NavLink>
            {user && user.type === 'user' && <NavLink to = "/add_review"> Add Review</NavLink>}
            {!user && <NavLink to="/login">Login</NavLink>} 
            {user && <NavLink onClick={logOutUser} to="/login">Log Out</NavLink>}
            {!user ? <NavLink to="/signup">Signup</NavLink> : null}
            

        </nav>
    )
}

export default NavBar