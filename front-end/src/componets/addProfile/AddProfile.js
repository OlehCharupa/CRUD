import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addProfile, editProfile } from '../../redux/operations/profile';
import styles from "./AddProfile.module.css"
import iconSubmit from "./images/iconCheck.svg"
import iconClose from "./images/iconClose.svg"



const AddProfile = ({ toggleModal, profile = "" }) => {
    let initialState = {
        nameProfile: profile ? profile.nameProfile : "",
        gender: profile ? profile.gender : "male",
        birthdate: profile ? profile.birthdate : "",
        city: profile ? profile.city : ""
    }

    const [data, setData] = useState(initialState)
    const { nameProfile, gender, birthdate, city } = data
    const dispatch = useDispatch()
    const inputHendler = ({ target }) => {
        const { name, value } = target
        setData((state) => ({ ...state, [name]: value }))
    }
    const submitHeandler = (e) => {
        e.preventDefault()
        if (profile === null) {
            dispatch(addProfile(data))
        } else {
            dispatch(editProfile(profile._id, data))
        }
        // setData(initialState)
        toggleModal()
    }


    return (
        <form onSubmit={submitHeandler} className={styles.form}>
            <div className={styles.wrapperInput}>
                <label className={styles.label} htmlFor="nameProfile">name:</label>
                <input onChange={inputHendler} name="nameProfile" value={nameProfile} id="nameProfile" type="text" className={styles.input} />
            </div>
            <div className={styles.wrapperInput}>
                <p className={styles.label}>gender:</p>
                <div className={styles.wrapperRadio}>
                    <label>
                        <input onChange={inputHendler} type="radio" name="gender" checked={gender === "male"} value="male" />
                    male
                </label>
                    <label>
                        <input onChange={inputHendler} type="radio" name="gender" checked={gender === "female"} value="female" />
female
                </label>
                </div>
            </div>
            <div className={styles.wrapperInput}>
                <label className={styles.label} htmlFor="birthdate">birthdate:</label>
                <input onChange={inputHendler} name="birthdate" value={birthdate} id="birthdate" type="text" className={styles.input} />
            </div>
            <div className={styles.wrapperInput}>
                <label className={styles.label} htmlFor="city">city:</label>
                <input onChange={inputHendler} name="city" value={city} id="city" type="text" className={styles.input} />
            </div>
            <div className={styles.wrapperButton}>
                <button type="submit" className={styles.iconSubmit}>
                    <img src={iconSubmit} alt="iconSubmit" width="24px" height="24px" />
                </button>
                <button onClick={toggleModal} type="button" className={styles.iconClose}>
                    <img src={iconClose} alt="iconClose" width="24px" height="24px" />
                </button>
            </div>
        </form>
    );
};

export default AddProfile;