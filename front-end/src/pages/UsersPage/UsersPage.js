import React from 'react';
import Container from '../../componets/container/Container';
import ListUsers from '../../componets/listUsers/ListUsers';
import styles from "../ProfilesPage/ProfilePage.module.css"

const UsersPage = () => {
    return (
        <>
            <Container>
                <div className={styles.wrapper}>
                    <h1 className={styles.title}>Users:</h1>
                    <ListUsers />
                </div>
            </Container>
        </>
    );
};

export default UsersPage;