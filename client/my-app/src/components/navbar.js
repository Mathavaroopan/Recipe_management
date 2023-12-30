import React from 'react'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'
const Navbar = () => {

    const [cookies, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate('/auth')
    }
  return (
    <div className='navbar'>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create Recipe</Link>
        <Link to="/saved-recipes">Saved Recipes</Link>
        {(!cookies.access_token) ? <Link to="/auth">Login/Register</Link> : <button onClick={logout}>Logout</button>}
      </div>
      <div>
        <hr />
      </div>
    </div>
  )
}

export default Navbar;
