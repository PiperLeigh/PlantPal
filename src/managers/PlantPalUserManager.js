export const getPals = () => {
    return fetch("http://localhost:8000/pals", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("pp_token")}`
        }
    })
        .then(response => response.json())
}