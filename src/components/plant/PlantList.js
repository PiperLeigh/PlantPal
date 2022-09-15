import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getPlant, destroyPlant } from "../../managers/PlantManager"

export const PlantList = () => {
    const navigate = useNavigate()
    const [plants, setPlant] = useState([])
    const loadPlants = () => {
        getPlant().then(data => setPlant(data))
    }
    useEffect(() => {
        loadPlants()
    }, [])

    return (
        <article className="plants">
            <button className="btn__plantAdd"
                onClick={() => {
                    navigate(`/plantForm`) //Where is gameList coming from?
                }}>Add New Plant</button>
            {
                plants.map(plant => {
                    return <section key={`plant--${plant.id}`} className="plant">
                        <div className="plant__plantPhoto">{plant.plantPhoto}</div>
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