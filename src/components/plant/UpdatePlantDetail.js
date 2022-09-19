import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSunTypes, getWaterSpans, updatePlant } from "../../managers/PlantManager"

export const UpdatePlantDetail = () => {
    const [currentPlant, setCurrentPlant] = useState([])
    const navigate = useNavigate()
    const { plantId } = useParams()
    const [sunTypes, setSunTypes] = useState([])
    const [waterSpans, setWaterSpans] = useState([])
    const [plantPhoto, setPlantPhoto] = useState("")
    const loadSunTypes = () => {
        getSunTypes().then(data => setSunTypes(data))
    }
    const loadWaterSpans = () => {
        getWaterSpans().then(data => setWaterSpans(data))
    }
    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createPlantPhotoString = (plant) => {
        getBase64(plant.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            let copy = {...currentPlant}
            copy.plantPhoto = base64ImageString 
            setCurrentPlant(copy)
        });
    }

    const changePlantState = (domEvent) => {
        const updatePlant = { ...currentPlant }
        updatePlant[domEvent.target.name] = domEvent.target.value
        setCurrentPlant(updatePlant)
    }

    useEffect(() => {
        loadSunTypes()
    }, [])

    useEffect(() => {
        loadWaterSpans()
    }, [])

    useEffect(
        () => {
            fetch(`http://localhost:8000/plants/${plantId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("pp_token")}`
                    }
                }
            )
                .then(response => response.json()
                    .then((plantArray) => {
                        setCurrentPlant(plantArray)
                    }))
        },
        [plantId]
    )

    return (
        <form>
            <input type="file" id="plantPhoto" onChange={createPlantPhotoString} />


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
                    // Prevent form from being submitted
                    evt.preventDefault()

                    let sunType = currentPlant?.sunType
                    let waterSpanId = currentPlant?.waterSpanId

                    typeof sunType === 'string' ? sunType = parseInt(sunType) : sunType = sunType.id
                    typeof waterSpanId === 'string' ? waterSpanId = parseInt(waterSpanId) : waterSpanId = waterSpanId.id

                    const plant = {
                        id: plantId,
                        userId: localStorage.getItem("pp_token"),
                        plantPhoto: currentPlant.plantPhoto,
                        name: currentPlant.name,
                        water: currentPlant.water,
                        waterSpanId: currentPlant.waterSpanId.id,
                        sunType: currentPlant.sunType.id,
                        lastWatered: currentPlant.lastWatered,
                        petToxic: currentPlant.petToxic,
                        notes: currentPlant.notes
                    }

                    // Send POST request to your API
                    updatePlant(plant)
                        .then(() => navigate("/plantList"))
                }}
                className="btn btn-primary">Update</button>

        </form>
    )
}