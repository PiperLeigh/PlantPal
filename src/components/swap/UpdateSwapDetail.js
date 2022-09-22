import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateSwap, leaveSwap, attendSwap, getSwaps } from "../../managers/SwapManager"
import "./UpdateSwapDetail.css"

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

            setCoverPhoto(base64ImageString)
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
    return (<>
        <form className="editSwap__container">

            <div className="editSwap__col1">
                <fieldset className="editSwap__title">
                    <div className="form-group">
                        <label className="editSwap__titleLabel" htmlFor="title">Title </label>
                        <input className="editSwap__titleInput" type="text" name="title" required autoFocus
                            value={currentSwap.title}
                            onChange={changeSwapState}
                        />
                    </div>
                </fieldset>
                <div className="photoSet">
                    <img className="editSwap__photo" src={`http://localhost:8000${currentSwap?.coverPhoto}`} width={150} />
                    <input className="editSwap__photoInput" type="file" id="coverPhoto" onChange={createCoverPhotoString} />
                </div>
            </div>

            <div className="editSwap__col2">
                <fieldset className="editSwap__location">
                    <div className="form-group">
                        <label className="editSwap__locationLabel" htmlFor="location">Location </label>
                        <input className="editSwap__locationInput" type="text" name="location" required autoFocus
                            value={currentSwap.location}
                            onChange={changeSwapState}
                        />
                    </div>
                </fieldset>

                <div className="when">
                    <fieldset className="editSwap__date">
                        <div className="form-group">
                            <label className="editSwap__dateLabel" htmlFor="date">Date </label>
                            <input className="editSwap__dateInput" type="date" name="date" required autoFocus 
                                value={currentSwap.date}
                                onChange={changeSwapState}
                            />
                        </div>
                    </fieldset>

                    <fieldset className="editSwap__time">
                        <div className="form-group">
                            <label className="editSwap__timeLabel" htmlFor="time">Time </label>
                            <input className="editSwap__timeInput" type="time" name="time" required autoFocus 
                                value={currentSwap.time}
                                onChange={changeSwapState}
                            />
                        </div>
                    </fieldset>
                </div>
                    <label className="editSwap__notesLabel" htmlFor="notes">Description </label>
                <fieldset className="editSwap__notes">

                    <div className="form-group">
                        <textarea className="editSwap__notesInput" id="description" name="description" rows="15" cols="50" value={currentSwap.description}
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
                            coverPhoto: coverPhoto,
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
                    className="btn__updateSwap">Update</button>
            </div>
        </form>
    </>
    )
}

