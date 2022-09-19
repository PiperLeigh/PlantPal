import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { getSwaps, destroySwap } from "../../managers/SwapManager"


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
        <article className="swaps">
            <button className="btn__plantAdd"
                onClick={() => {
                    navigate(`/swapForm`)
                }}>Plan New Swap</button>
            {
                swaps.map(swap => {
                    return <section key={`swap--${swap.id}`} className="swap">
                        <div>
                            <button><img src={`http://localhost:8000${swap.coverPhoto}`} alt={swap.title} width={150} onClick={() => {
                                navigate(`${swap.id}/update`)
                            }} /></button>
                            <div className="swap__title">{swap.title}</div>
                            <div className="swap__host">hosted by {swap.host.user.username}</div>
                            <div className="swap__date">{swap.date}</div>
                        </div>

                        <button className="btn__swapDelete"
                            onClick={() => {
                                destroySwap(swap)
                                    .then(() => loadSwaps())
                            }}
                        >Delete</button>

                    </section>
                })
            }
        </article>
    )
}