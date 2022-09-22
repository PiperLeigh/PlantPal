import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { createSwap } from "../../managers/SwapManager"
import "./SwapForm.css"

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
        <form className="swapForm">
            <div className="swapForm__col1">
                <input className="swapCreate__coverPhotoInput" type="file" id="coverPhoto" onChange={createSwapImageString} />
                <fieldset className="swapCreate__title">
                    <div className="swapCreate__titleGroup">
                        <label className="swapCreate__titleLabel" htmlFor="title">Title </label>
                        <input className="swapCreate__titleInput" type="text" name="title" required autoFocus
                            value={currentSwap.title}
                            onChange={changeSwapState}
                        />
                    </div>
                </fieldset>

                <fieldset className="swapCreate__date">
                    <div className="swapCreate__dateGroup">
                        <label className="swapCreate__dateLabel" htmlFor="date">Date </label>
                        <input className="swapCreate__dateInput" type="date" name="date" required autoFocus
                            value={currentSwap.date}
                            onChange={changeSwapState}
                        />
                    </div>
                </fieldset>

                <fieldset className="swapCreate__time">
                    <div className="swapCreate__timeGroup">
                        <label className="swapCreate__timeLabel" htmlFor="time">Time </label>
                        <input className="swapCreate__timeInput" type="time" name="time" required autoFocus
                            value={currentSwap.time}
                            onChange={changeSwapState}
                        />
                    </div>
                </fieldset>
            </div>

            <div className="swapForm__col2">

            <fieldset className="swapCreate__location">
                    <div className="form-group">
                        <label className="swapCreate__locationLabel" htmlFor="location">Location </label>
                        <input className="swapCreate__locationInput" type="text" name="location" required autoFocus
                            onChange={changeSwapState}
                        />
                    </div>
                </fieldset>
                
                <fieldset className="swapCreate__description">
                    <div className="swapCreate__descriptionGroup">
                        <label className="swapCreate__descriptionLabel" htmlFor="notes">Description </label>
                        <textarea className="swapCreate__descriptionInput" id="description" name="description" rows="6" cols="46" value={currentSwap.description}
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
                            description: currentSwap.description,
                            attendees: []
                        }
                        createSwap(swap)
                            .then(() => navigate("/swapList"))
                    }}
                    className="btn__createSwap">Create</button>
            </div>
        </form>
    )
}