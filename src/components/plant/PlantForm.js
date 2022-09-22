import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getSunTypes, getWaterSpans, createPlant } from '../../managers/PlantManager.js'
import "./PlantForm.css"


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

    const createPlantPhotoString = (plant) => {
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
            <div className="col1">
                <input className="photoInput" type="file" id="plantPhoto" onChange={createPlantPhotoString} />


                <fieldset className="nameField">
                    <div className="form-group">
                        <label className="nameLabel" htmlFor="name">Plant Name </label>
                        <input type="text" name="name" required autoFocus className="nameInput"
                            value={currentPlant.name}
                            onChange={changePlantState}
                        />
                    </div>
                </fieldset>

                <fieldset className="petToxicField">
                <div>
                    <label for="petToxic">Toxic to pets</label>
                    <input type="checkbox" id="petToxic" name="petToxic" value={currentPlant.petToxic} />
                </div>
                </fieldset>

                <fieldset className="lastWateredField">
                    <div className="form-group">
                        <label className="lastWateredLabel" htmlFor="date">Last watered </label>
                        <input type="date" name="lastWatered" required autoFocus className="lastWateredInput"
                            value={currentPlant.lastWatered}
                            onChange={changePlantState}
                        />
                    </div>
                </fieldset>
            </div>

            <div className="col2">

                <div className="waterGroup">
                    <fieldset className="sunTypeField">
                        <div>
                            <label className="sunTypeLabel">Sun </label>
                            <select className="sunTypeInput" name="sunType" value={currentPlant.sunType} onChange={changePlantState}>
                                {sunTypes.map((sunType) => (
                                    <option value={sunType.id}>{sunType.label}</option>
                                ))}
                            </select>
                        </div>
                    </fieldset>

                    <fieldset className="waterField">
                        <div className="form-group">
                            <label className="waterLabel" htmlFor="water">Water </label>
                            <input className="waterInput" type="number" name="water" required autoFocus
                                value={currentPlant.water}
                                onChange={changePlantState}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="spanField">
                        <div>
                            <label className="spanLabel">per  </label>
                            <select className="spanInput" name="waterSpan" value={currentPlant.waterSpanId} onChange={changePlantState}>
                                {waterSpans.map((waterSpan) => (
                                    <option value={waterSpan.id}>{waterSpan.label}</option>
                                ))}
                            </select>
                        </div>
                    </fieldset>
                </div>

                <fieldset className="notesField">
                    <div className="notesFieldGroup">
                        <label className="notesLabel" htmlFor="notes">Notes </label>
                        <textarea className="notesInput" id="notes" name="notes" rows="4" cols="50" value={currentPlant.notes}
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
                            .then(() => navigate("/"))
                    }}
                    className="btn__createPlant">Create</button>
            </div>
        </form>
    )
}

