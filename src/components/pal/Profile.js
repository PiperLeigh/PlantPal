import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getPals, createPal, updatePal } from "../../managers/PlantPalUserManager"

export const UpdatePalProfile = () => {
    const navigate = useNavigate()
    const [palPhoto, setPalPhoto] = useState("")
    const [currentPal, setCurrentPal] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8000/pals/1`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${localStorage.getItem("pp_token")}`
                    }
                }
            )
                .then(response => response.json()
                    .then((palArray) => {
                        palArray.first_name = palArray.user.first_name
                        palArray.last_name = palArray.user.last_name
                        palArray.email = palArray.user.email
                        setCurrentPal(palArray)
                    }))
        },
        []
    )

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProfileImageString = (pal) => {
        getBase64(pal.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);

            setPalPhoto(base64ImageString)
        });
    }

    const changePalState = (domEvent) => {
        const updatePal = { ...currentPal }
        updatePal[domEvent.target.name] = domEvent.target.value
        setCurrentPal(updatePal)
    }

    return (
        <form>
            <img src={`http://localhost:8000${currentPal?.profilePic}`} width={150} />
            <input type="file" id="profilePic" onChange={createProfileImageString} />

            <fieldset>
                <div className="form-group">
                    <label htmlFor="username">username </label>
                    <input type="text" name="username" required autoFocus className="form-control"
                        value={currentPal?.user?.username}
                        onChange={changePalState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="first_name">First Name </label>
                    <input type="text" name="first_name" required autoFocus className="form-control"
                        value={currentPal?.user?.first_name}
                        onChange={changePalState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name </label>
                    <input type="text" name="last_name" required autoFocus className="form-control"
                        value={currentPal?.user?.last_name}
                        placeholder={currentPal?.user?.last_name}
                        onChange={changePalState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email </label>
                    <input type="text" name="email" required autoFocus className="form-control"
                        value={currentPal?.email}
                        onChange={changePalState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="bio">Bio </label>
                    <textarea type="text" name="bio" required autoFocus className="form-control"
                        value={currentPal?.bio}
                        onChange={changePalState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const palUser = {
                        id: currentPal.id,
                        user: currentPal.user.id,
                        profilePic: palPhoto,
                        email: currentPal.email,
                        address: currentPal.address,
                        bio: currentPal.bio
                    }
                    updatePal(palUser)
                        .then(() => navigate("/updatePalProfile"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}