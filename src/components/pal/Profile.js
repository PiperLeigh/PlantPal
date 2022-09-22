import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getPals, createPal, updatePal } from "../../managers/PlantPalUserManager"
import "./Profile.css"

export const UpdatePalProfile = () => {
    const navigate = useNavigate()
    const [palPhoto, setPalPhoto] = useState("")
    const [currentPal, setCurrentPal] = useState()
    const loadPal = () => {
        fetch(`http://localhost:8000/pals/myProfile`,
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
    }

    useEffect(
        () => {
            loadPal()
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
        <form className="profile">
            <div className="profile__col1">
                <div className="profile__imageGroup">
                    <img className="profile__image" src={`http://localhost:8000${currentPal?.profilePic}`} width={150} />
                    <input className="profile__imageInput" type="file" id="profilePic" onChange={createProfileImageString} />
                </div>
                <fieldset className="profile__usernameField">
                    <div className="profile__usernameFieldGroup">
                        <label className="profile__usernameLabel" htmlFor="username">Username </label>
                        <input className="profile__usernameInput" type="text" name="username" required autoFocus
                            value={currentPal?.username}
                            onChange={changePalState}
                        />
                    </div>
                </fieldset>

                <fieldset className="profile__firstField">
                    <div className="profile__firstGroup">
                        <label className="profile__firstLabel" htmlFor="first_name">First Name </label>
                        <input className="profile__firstInput" type="text" name="first_name" required autoFocus
                            value={currentPal?.first_name}
                            onChange={changePalState}
                        />
                    </div>
                </fieldset>

                <fieldset className="profile__lastField">
                    <div className="profile__lastGroup">
                        <label className="profile__lastLabel" htmlFor="last_name">Last Name </label>
                        <input className="profile__lastInput" type="text" name="last_name" required autoFocus
                            value={currentPal?.last_name}
                            placeholder={currentPal?.last_name}
                            onChange={changePalState}
                        />
                    </div>
                </fieldset>

                <fieldset className="profile__emailField">
                    <div className="profile__emailGroup">
                        <label className="profile__emailLabel" htmlFor="email">Email </label>
                        <input className="profile__emailInput" type="text" name="email" required autoFocus
                            value={currentPal?.email}
                            onChange={changePalState}
                        />
                    </div>
                </fieldset>
            </div>

            <div className="profile__col2">
                <fieldset className="profile__bioField">
                    <div className="profile__bioGroup">
                        <label className="profile__bioLabel" htmlFor="bio">Bio </label>
                        <textarea className="profile__bioInput" type="text" name="bio"  rows="13" cols="33" required autoFocus
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
                            username: currentPal.username,
                            first_name: currentPal.first_name,
                            last_name: currentPal.last_name,
                            address: currentPal.address,
                            bio: currentPal.bio
                        }
                        updatePal(palUser)
                            .then(() => loadPal())
                    }}
                    className="btn__updatePal">Update</button>
            </div>
        </form>
    )
}