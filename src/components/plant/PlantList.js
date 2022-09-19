import React, { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { getPlants, destroyPlant } from "../../managers/PlantManager"

export const PlantList = () => {
    const navigate = useNavigate()
    const [plants, setPlants] = useState([])
    const loadPlants = () => {
        getPlants().then(data => setPlants(data))
    }
    useEffect(() => {
        loadPlants()
    }, [])

    return (
        <article className="plants">
            <button className="btn__plantAdd"
                onClick={() => {
                    navigate(`/plantForm`)
                }}>Add New Plant</button>
            {
                plants.map(plant => {
                    return <section key={`plant--${plant.id}`} className="plant">
                        <div>
                            <button><img src={`http://localhost:8000${plant.plantPhoto}`} alt={plant.name} width={150} onClick={() => {
                                navigate(`${plant.id}/update`)
                            }} /></button>
                        </div>
                        <div className="plant__name">{plant.name}</div>
                        <button className="btn__plantDelete"
                            onClick={() => {
                                destroyPlant(plant)
                                    .then(() => loadPlants())
                            }}
                        >Delete</button>

                    </section>
                })
            }
        </article>
    )
}