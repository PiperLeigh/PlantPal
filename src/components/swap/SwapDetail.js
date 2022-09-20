import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { leaveSwap, attendSwap, getSwaps, getSingleSwap } from "../../managers/SwapManager"

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
    <article>
        <img  className="swapPhoto" src={`http://localhost:8000${currentSwap.coverPhoto}`} alt="Cover photo for swap"/>
        <div className="swap__title">{currentSwap.title}</div>
        <div className="swap__title">{currentSwap.location}</div>
        <div className="swap__title">{currentSwap.date}</div>
        <div className="swap__title">{currentSwap.time}</div>
        <div className="swap__title">{currentSwap.description}</div>
        {
            currentSwap.attending ?
                <button onClick={() => {
                    leaveSwap(currentSwap.id)
                        .then(() => getSingleSwap(swapId).then(setCurrentSwap))
                }}>Not Attending</button>
                :
                <button onClick={() => {
                    attendSwap(currentSwap.id)
                        .then(() => getSingleSwap(swapId).then(setCurrentSwap))
                }}>Attending Swap</button>
        }
    </article>
)
}