import React, { useEffect, useState } from "react"
import { getPals } from "../../managers/PlantPalUserManager"



export const PalList = (props) => {
    const [pals, setPals] = useState([])
    const loadPals = () => {
        getPals().then(data => setPals(data))
    }
    useEffect(() => {
        loadPals()
    }, [])

    return (
        <article className="pals">
            {
                pals.map(pal => {
                    return <section key={`pal--${pal.id}`} className="pal">
                        <img  className="pal__profilePic" src={`http://localhost:8000${pal.profilePic}`}width={150}/>
                        <div className="pal__userName">{pal.user.username}</div>
                        <div className="pal__firstName">{pal.user.first_name} {pal.user.last_name}</div>
                    </section>
                })
            }
        </article>
    )
}