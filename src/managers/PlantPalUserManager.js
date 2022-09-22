export const getSinglePal = (palId) => {
    return fetch(`http://localhost:8000/pals/${palId}`,
        {
            headers: {
                "Authorization": `Token ${localStorage.getItem("pp_token")}`
            }
        })
            .then(res => res.json())
    }

export const getPals = () => {
    return fetch("http://localhost:8000/pals", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(response => response.json())
}

export const createPal = (pal) => {
    return fetch("http://localhost:8000/pals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(pal)
    })
        .then(res => res.json())
}

export const updatePal = (currentPal) => {
    return fetch(`http://localhost:8000/pals/${currentPal.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(currentPal)
    })
}


