import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { editUserOperation } from '../../redux/operations/user';
import styles from "../addProfile/AddProfile.module.css"
import iconSubmit from "./images/iconCheck.svg"
import iconClose from "./images/iconClose.svg"

const EditUser = ({ toggleModal, user = "" }) => {
    let initialState = {
        name: user.name,
        email: user.email,
        role: user.role,
        profiles: user.profiles,
        _id: user._id
    }

    const [data, setData] = useState(initialState)
    const { name, email, role } = data
    const dispatch = useDispatch()
    const history = useHistory()

    const inputHendler = ({ target }) => {
        const { name, value } = target
        setData((state) => ({ ...state, [name]: value }))
    }

    const submitHeandler = (e) => {
        e.preventDefault()
        dispatch(editUserOperation(user._id, data))
        console.log("data", data);
        history.push({
            state: {
                user: { ...data }
            }
        })
        toggleModal()
    }


    return (
        <form onSubmit={submitHeandler} className={styles.form}>
            <div className={styles.wrapperInput}>
                <label className={styles.label} htmlFor="name">user name:</label>
                <input onChange={inputHendler} name="name" value={name} id="name" type="text" className={styles.input} />
            </div>
            <div className={styles.wrapperInput}>
                <label className={styles.label} htmlFor="email">email:</label>
                <input onChange={inputHendler} name="email" value={email} id="email" type="text" className={styles.input} />
            </div>

            <div className={styles.wrapperInput}>
                <p className={styles.label}>role:</p>
                <div className={styles.wrapperRadio}>
                    <label>
                        <input onChange={inputHendler} type="radio" name="role" checked={role === "user"} value="user" />
                    user
                </label>
                    <label>
                        <input onChange={inputHendler} type="radio" name="role" checked={role === "admin"} value="admin" />
admin
                </label>
                </div>
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

export default EditUser;