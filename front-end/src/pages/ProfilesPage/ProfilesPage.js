import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../../componets/container/Container';
import ListProfiles from '../../componets/listProfiles/ListProfiles';
import styles from "./ProfilePage.module.css"

const ProfilesPage = () => {

    return (
        <>
            <Container>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Profiles:</h1>
                    <ListProfiles />
                </div>
            </Container>
        </>
    );
};

export default ProfilesPage;