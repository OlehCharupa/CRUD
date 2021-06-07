import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from "./ListProfiles.module.css"
import iconPlus from "./images/iconPlus.svg"
import Modal from '../modal/Modal';
import AddProfile from '../addProfile/AddProfile';
import { deleteProfile } from "../../redux/operations/profile.js"
import { useLocation } from 'react-router';


const ListProfiles = ({ profiles = null, minList = false }) => {
    const profilesCurrent = useSelector(state => state.currentUser?.profiles)
    const [profileOne, setProfileOne] = useState(null)
    const [currentProfiles, setCurrentProfiles] = useState([])
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const location = useLocation()
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        if (!!location.state?.profiles) {
            setCurrentProfiles(location.state.profiles)
        } else {
            if (!!profiles) {
                setCurrentProfiles(profiles)
            } else {
                setCurrentProfiles(profilesCurrent)
            }
        }
    }, [location, profiles, profilesCurrent])


    const profileCurrent = (profile) => {
        setProfileOne(profile)
        toggleModal()
    }

    const createProfile = () => {
        setProfileOne(null)
        toggleModal()
    }

    const deleteItem = (id) => {
        dispatch(deleteProfile(id))
    }

    return (
        <>
            <div className={styles.relative}>
                <div className={minList ? styles.containerMin : styles.container}>

                    <ul className={styles.list}>
                        {
                            currentProfiles && currentProfiles.map((profile) => (
                                <li className={styles.item} id={profile._id} key={profile._id}>
                                    <div className={styles.wrapperInfo}>
                                        <p className={styles.name} title={profile.nameProfile}>{profile.nameProfile}</p>
                                        <p className={styles.gender}>{profile.gender}</p>
                                        <p className={styles.birthdate}>{profile.birthdate}</p>
                                        <p className={styles.city}>{profile.city}</p>
                                    </div>
                                    <div className={styles.wrapperButton}>
                                        <p onClick={(() => profileCurrent(profile))} className={styles.btnEdit}>
                                            edit
                                        </p>
                                        <p className={styles.btnDelete} onClick={() => deleteItem(profile._id)}>
                                            delete
                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                        <li className={styles.item} onClick={createProfile} key="plus">
                            <img className={styles.iconPlus} src={iconPlus} alt="iconPlus" width="70px" height="70px" />
                            <p className={styles.createText}>Crearte new profile</p>

                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                arrowVisible
                toggleModal={toggleModal}
                openModal={openModal}
            >
                <AddProfile toggleModal={toggleModal} profile={profileOne} />
            </Modal>
        </>
    );
};

export default ListProfiles;



