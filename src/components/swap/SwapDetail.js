import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { leaveSwap, attendSwap, getSingleSwap } from "../../managers/SwapManager"
import "./SwapDetail.css"
export const SwapDetail = () => {
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

    useEffect(
        () => {
            getSingleSwap(swapId)
                .then((swapArray) => {
                    setCurrentSwap(swapArray)
                })
        },
        [swapId]

    )
    return (
        <article className="swapDetail">
            <div className="swapDetail__col1">
                <h1 className="swap__title">{currentSwap.title}</h1>
                <img className="swap__swapPhoto" src={`http://localhost:8000${currentSwap.coverPhoto}`} alt="Cover photo for swap" />
                <div className="swap__date">{currentSwap.date}</div>
                <div className="swap__time">{currentSwap.time}</div>
                <div className="swap__location">{currentSwap.location}</div>
            </div>

            <div className="swapDetail__col2">
            <div className="swap__description">{currentSwap.description}</div>

            {
                    currentSwap.attending ?
                        <button className="bttnAttending" onClick={() => {
                            leaveSwap(currentSwap.id)
                                .then(() => getSingleSwap(swapId).then(setCurrentSwap))
                        }}>Not Attending</button>
                        :
                        <button className="bttnAttending" onClick={() => {
                            attendSwap(currentSwap.id)
                                .then(() => getSingleSwap(swapId).then(setCurrentSwap))
                        }}>Attend Swap</button>
                }

            </div>

        </article>
    )
}