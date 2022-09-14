import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="nav-link" to="/plantList">Collection</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/swapList">Swaps</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/palList">Pals</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/">Profile</Link>
            </li>
            {
                (localStorage.getItem("pp_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("pp_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
