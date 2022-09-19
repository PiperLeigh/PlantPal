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

export const updatePal = (pal) => {
    return fetch(`http://localhost:8000/pals/${pal.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(pal)
    })
        .then(res => res.json())
}