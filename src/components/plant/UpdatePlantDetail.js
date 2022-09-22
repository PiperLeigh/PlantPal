import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getSunTypes, getWaterSpans, updatePlant } from "../../managers/PlantManager"
import "./UpdatePlantDetail.css"


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

            setPlantPhoto(base64ImageString)
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
        <form className="plant__contain">
            <div className="plant__col1">
                <img className="plant__photo" src={`http://localhost:8000${currentPlant?.plantPhoto}`} width={150} />
                <input className="plant__photoInput" type="file" id="plantPhoto" onChange={createPlantPhotoString} checked={true}/>

                <fieldset className="plant__name">
                    <div>
                        <label htmlFor="name">Name </label>
                        <input type="text" name="name" required autoFocus className="name__input"
                            value={currentPlant.name}
                            onChange={changePlantState}
                        />
                    </div>
                </fieldset>

                <div>
                    <label for="petToxic">Toxic to pets</label>
                    <input type="checkbox" id="petToxic" name="petToxic" checked={currentPlant.petToxic} onChange={(evt) => {
                                const updatePlant = { ...currentPlant }
                                updatePlant[evt.target.name] = evt.target.checked
                                setCurrentPlant(updatePlant)
                    }}/>
                </div>

            </div>

            <div className="plant__col2">
                <fieldset className="plant__sunType">
                    <div>
                        <label>Sun </label>
                        <select className="sunType__input" name="sunType" value={currentPlant.sunType} onChange={changePlantState}>
                            {sunTypes.map((sunType) => (
                                <option value={sunType.id}>{sunType.label}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <div className="plant__waterSet">
                    <fieldset className="plant__water">
                        <div className="form-group">
                            <label htmlFor="water">Water </label>
                            <input type="number" name="water" required autoFocus className="water__input"
                                value={currentPlant.water}
                                onChange={changePlantState}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="plant__waterPer">
                        <div>
                            <select className="waterPer__input" name="waterSpanId" value={currentPlant.waterSpanId} onChange={changePlantState}>
                                {waterSpans.map((waterSpan) => (
                                    <option value={waterSpan.id}>{waterSpan.label}</option>
                                ))}
                            </select>
                        </div>
                    </fieldset>
                </div>
                <fieldset className="plant__lastWatered">
                    <div>
                        <label htmlFor="date">Watered </label>
                        <input type="date" name="lastWatered" required autoFocus className="lastWatered__input"
                            value={currentPlant.lastWatered}
                            onChange={changePlantState}
                        />
                    </div>
                </fieldset>

                <label className="plant__notesLabel">Notes </label>
                <fieldset className="plant__notes">
                    <div className="form-group">
                        <textarea id="notes" name="notes" rows="13" cols="33" value={currentPlant.notes}
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
                            plantPhoto: plantPhoto,
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
                            .then(() => navigate("/"))
                    }}
                    className="btn__updatePlant">Update</button>
            </div>

        </form>
    )
}