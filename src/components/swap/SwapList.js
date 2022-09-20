import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getSwaps, destroySwap } from "../../managers/SwapManager"
import "./SwapList.css"

export const SwapList = () => {
    const navigate = useNavigate()
    const [swaps, setSwaps] = useState([])
    const loadSwaps = () => {
        getSwaps().then(data => setSwaps(data))
    }
    useEffect(() => {
        loadSwaps()
    }, [])

    return (
        <>
            <div className="swapListHeader">
                <h2 className="swap">Share space <br></br> Share plants</h2>
                <button className="btn__swapAdd"
                    onClick={() => {
                        navigate(`/swapForm`)
                    }}>Plan New Swap</button>
            </div>
            <article className="swaps">
                {
                    swaps.map(swap => {
                        return <section key={`swap--${swap.id}`} className="swap">
                            <div>
                                <button className="photoButton"><img className="swapPhoto" src={`http://localhost:8000${swap.coverPhoto}`} alt={swap.title} width={150} onClick={() => {
                                    navigate(`${swap.id}/detail`)
                                }} /></button>
                                <div className="swapInfo">
                                    <div className="swap__title">{swap.title}</div>
                                    <div className="swap__host">hosted by {swap.host.user.username}</div>
                                    <div className="swap__date">{swap.date}</div>
                                </div>
                            </div>

                            <button className="btn__swapEdit"
                                onClick={() => {
                                    navigate(`${swap.id}/update`)
                                }}
                            >EDIT</button>
                            
                            <button className="btn__swapDelete"
                                onClick={() => {
                                    destroySwap(swap)
                                        .then(() => loadSwaps())
                                }}
                            >DELETE</button>

                        </section>
                    })
                }
            </article>
        </>
    )
}