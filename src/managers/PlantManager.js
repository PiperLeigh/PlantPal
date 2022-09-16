export const getGamer = (gamer) => {
    return fetch("http://localhost:8000/gamers", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(res => res.json())
}

export const getPlants = () => {
    return fetch("http://localhost:8000/plants", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(response => response.json())
}

export const getSunTypes = () => {
    return fetch("http://localhost:8000/suntypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(response => response.json())
}

export const getWaterSpans = () => {
    return fetch("http://localhost:8000/waterspans", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(response => response.json())
}

export const createPlant = (plant) => {
    return fetch("http://localhost:8000/plants", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
        body: JSON.stringify(plant)
    })
        .then(res => res.json())
}

export const destroyPlant = (plant) => {
    return fetch(`http://localhost:8000/plants/${plant.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
    })
}