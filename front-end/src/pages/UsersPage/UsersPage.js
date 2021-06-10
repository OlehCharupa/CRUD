import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Container from '../../componets/container/Container';
import ListUsers from '../../componets/listUsers/ListUsers';
import styles from "../ProfilesPage/ProfilePage.module.css"

const UsersPage = () => {
    const isAdmin = useSelector(state => state.currentUser.role === "admin")
    const history = useHistory()
    useEffect(() => {
        if (!isAdmin) {
            history.push("/profiles")
        }
    }, [isAdmin, history])
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