export const getPlant = () => {
    return fetch("http://localhost:8000/plants", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(response => response.json())
}

export const destroyPlant = (plant) => {
    return fetch(`http://localhost:8000/plants/${plant.id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        },
    })
}