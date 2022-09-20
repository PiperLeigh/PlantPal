import React, { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { getPlants, destroyPlant } from "../../managers/PlantManager"
import "./PlantList.css"

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
        <>
            <div className="plantListHeader">
                <h2 className="plantCopy">Admire and care <br></br>for your collection</h2>
                <button className="btn__plantAdd"
                    onClick={() => {
                        navigate(`/plantForm`)
                    }}>Add New Plant</button>
            </div>
            <article className="plants">
                {
                    plants.map(plant => {
                        return <section key={`plant--${plant.id}`} className="plant">
                            <div>
                                <button className="photoButton"><img className="plantPhoto" src={`http://localhost:8000${plant.plantPhoto}`} alt={plant.name} width={150} onClick={() => {
                                    navigate(`${plant.id}/update`)
                                }} /></button>
                            </div>
                            <div className="plant__nameBackground">
                            <div className="plant__name">{plant.name}</div>
                                <button className="btn__plantDelete"
                                    onClick={() => {
                                        destroyPlant(plant)
                                            .then(() => loadPlants())
                                    }}
                                >DELETE</button>
                            </div>

                        </section>
                    })
                }

            </article>
        </>
    )
}