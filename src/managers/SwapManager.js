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

export const destroySwap = (swap) => {
    return fetch(`http://localhost:8000/swaps/${swap.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
    })
}