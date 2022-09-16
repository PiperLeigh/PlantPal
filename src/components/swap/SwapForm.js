import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { createSwap } from "../../managers/SwapManager"
export const SwapForm = () => {
    const navigate = useNavigate()
    const [swapPhoto, setSwapPhoto] = useState("")
    const [currentSwap, setCurrentSwap] = useState({
        title: "",
        coverPhoto: "",
        host: localStorage.getItem("pp_token"),
        location: "",
        date: "",
        time: "",
        description: "",
        attendees: []
    })

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createSwapImageString = (swap) => {
        getBase64(swap.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            setSwapPhoto(base64ImageString)
        });
    }

    const changeSwapState = (domEvent) => {
        const newSwap = { ...currentSwap }
        newSwap[domEvent.target.name] = domEvent.target.value
        setCurrentSwap(newSwap)
    }
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

            <input type="file" id="coverPhoto" onChange={createSwapImageString} />

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
                        title: currentSwap.title,
                        coverPhoto: swapPhoto,
                        host: localStorage.getItem("pp_token"),
                        location: currentSwap.location,
                        date: currentSwap.date,
                        time: currentSwap.time,
                        description: currentSwap,
                        attendees: []
                    }
                    createSwap(swap)
                        .then(() => navigate("/swapList"))
                }}
                className="btn btn-primary">Create</button>

        </form>
    )
}