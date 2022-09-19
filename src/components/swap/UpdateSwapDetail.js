import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateSwap } from "../../managers/SwapManager"


export const UpdateSwapDetail = () => {
    const navigate = useNavigate()
    const [currentSwap, setCurrentSwap] = useState([])
    const { swapId } = useParams()
    const [coverPhoto, setCoverPhoto] = useState("")

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createCoverPhotoString = (swap) => {
        getBase64(swap.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            let copy = { ...currentSwap }
            copy.coverPhoto = base64ImageString
            setCurrentSwap(copy)
        });
    }

    const changeSwapState = (domEvent) => {
        const updateSwap = { ...currentSwap }
        updateSwap[domEvent.target.name] = domEvent.target.value
        setCurrentSwap(updateSwap)
    }

    useEffect(
        () => {
            fetch(`http://localhost:8000/swaps/${swapId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("pp_token")}`
                    }
                }
            )
                .then(response => response.json()
                    .then((swapArray) => {
                        setCurrentSwap(swapArray)
                    }))
        },
        [swapId]
    )
    return (
        <form>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentSwap.title}
                        onChange={changeSwapState}
                    />
                </div>
            </fieldset>

            <input type="file" id="coverPhoto" onChange={createCoverPhotoString} />

            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        value={currentSwap.location}
                        onChange={changeSwapState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentSwap.date}
                        onChange={changeSwapState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentSwap.time}
                        onChange={changeSwapState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="notes">Description </label>
                    <textarea id="description" name="description" rows="4" cols="50" value={currentSwap.description}
                        onChange={changeSwapState}>
                    </textarea>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const swap = {
                        id: swapId,
                        title: currentSwap.title,
                        coverPhoto: currentSwap.coverPhoto,
                        host: localStorage.getItem("pp_token"),
                        location: currentSwap.location,
                        date: currentSwap.date,
                        time: currentSwap.time,
                        description: currentSwap.description,
                        attendees: []
                    }
                    updateSwap(swap)
                        .then(() => navigate("/swapList"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}