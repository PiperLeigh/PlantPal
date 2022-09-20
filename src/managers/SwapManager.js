export const getSingleSwap = (swapId) => {
    return fetch(`http://localhost:8000/swaps/${swapId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(res => res.json())
    }



export const getSwaps = (gamer) => {
    return fetch("http://localhost:8000/swaps", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(res => res.json())
}

export const createSwap = (swap) => {
    return fetch("http://localhost:8000/swaps", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(swap)
    })
        .then(res => res.json())
}

export const updateSwap = (currentSwap) => {
    return fetch(`http://localhost:8000/swaps/${currentSwap.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(currentSwap)
    })
}

export const destroySwap = (swap) => {
    return fetch(`http://localhost:8000/swaps/${swap.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
    })
}

export const leaveSwap = (swapId) => {
    // TODO: Write the DELETE fetch request to leave an swap
    return fetch(`http://localhost:8000/swaps/${swapId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
    })
}

export const attendSwap = (swapId) => {
    // TODO: Write the DELETE fetch request to leave an swap
    return fetch(`http://localhost:8000/swaps/${swapId}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(swapId)
    })
}