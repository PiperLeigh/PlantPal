import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getSunTypes, getWaterSpans, createPlant } from '../../managers/PlantManager.js'


export const PlantForm = () => {
    const navigate = useNavigate()
    const [sunTypes, setSunTypes] = useState([])
    const [waterSpans, setWaterSpans] = useState([])
    const [plantPhoto, setPlantPhoto] = useState("")
    const loadSunTypes = () => {
        getSunTypes().then(data => setSunTypes(data))
    }
    const loadWaterSpans = () => {
        getWaterSpans().then(data => setWaterSpans(data))
    }

    const [currentPlant, setCurrentPlant] = useState({
        userId: localStorage.getItem("pp_token"),
        plantPhoto: "",
        name: "",
        water: "",
        waterSpanId: 1,
        sunType: 2,
        lastWatered: "",
        petToxic: true,
        notes: ""
    })

    useEffect(() => {
        loadSunTypes()
    }, [])
    useEffect(() => {
        loadWaterSpans()
    }, [])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createPlantImageString = (plant) => {
        getBase64(plant.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            setPlantPhoto(base64ImageString)
        });
    }

    const changePlantState = (domEvent) => {
        const newPlant = { ...currentPlant }
        newPlant[domEvent.target.name] = domEvent.target.value
        setCurrentPlant(newPlant)
    }

    return (
        <form className="plantForm">

            <input type="file" id="plantPhoto" onChange={createPlantImageString} />


            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Plant Name </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentPlant.name}
                        onChange={changePlantState}
                    />
                </div>
            </fieldset>

            <fieldset className="form-group_dropdown">
                <div>
                    <label>Sun </label>
                    <select name="sunType" value={currentPlant.sunType} onChange={changePlantState}>
                        {sunTypes.map((sunType) => (
                            <option value={sunType.id}>{sunType.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="water">Water </label>
                    <input type="number" name="water" required autoFocus className="form-control"
                        value={currentPlant.water}
                        onChange={changePlantState}
                    />
                </div>
            </fieldset>

            <fieldset className="form-group_dropdown">
                <div>
                    <label>per  </label>
                    <select name="waterSpan" value={currentPlant.waterSpanId} onChange={changePlantState}>
                        {waterSpans.map((waterSpan) => (
                            <option value={waterSpan.id}>{waterSpan.label}</option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Last watered </label>
                    <input type="date" name="lastWatered" required autoFocus className="form-control"
                        value={currentPlant.lastWatered}
                        onChange={changePlantState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="petToxic">Toxic to pets </label>
                    <div>
                        <input type="radio" id="true" name="petToxic" value="true" />
                        <label for="true">True </label>
                    </div>
                    <div>
                        <input type="radio" id="false" name="petToxic" value="false" />
                        <label for="false">False </label>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Notes </label>
                    <textarea id="notes" name="notes" rows="4" cols="50" value={currentPlant.notes}
                        onChange={changePlantState}>
                    </textarea>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const plant = {
                        userId: currentPlant.userId,
                        plantPhoto: plantPhoto,
                        name: currentPlant.name,
                        water: currentPlant.water,
                        waterSpanId: currentPlant.waterSpanId,
                        sunType: currentPlant.sunType,
                        lastWatered: currentPlant.lastWatered,
                        petToxic: currentPlant.petToxic,
                        notes: currentPlant.notes
                    }
                    createPlant(plant)
                        .then(() => navigate("/plantList"))
                }}
                className="btn btn-primary">Create</button>

        </form>
    )
}

