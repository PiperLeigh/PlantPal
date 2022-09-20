import { Link, useNavigate, useParams } from "react-router-dom"
import "./NavBar.css"
import { getPals } from "../../managers/PlantPalUserManager"
import { useEffect } from "react"

export const NavBar = () => {
    const navigate = useNavigate()
    // const [currentPal, setCurrentPal] = useEffect([])
    // const { palId } = useParams()

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8000/pals/${palId}`,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Token ${localStorage.getItem("pp_token")}`
    //                 }
    //             }
    //         )
    //             .then(response => response.json()
    //                 .then((palArray) => {
    //                     setCurrentPal(palArray)
    //                 }))
    //     },
    //     [palId]
    // )

    return (
        <ul className="navbar">
            <h1 className="logo">PlantPal</h1>
            <li className="navbar__item">
                <Link className="nav-link" to="/">Collection</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/swapList">Swaps</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/palList">Pals</Link>
            </li>
            <li className="navbar__item">
                <Link className="nav-link" to="/updatePalProfile">Profile</Link>
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
