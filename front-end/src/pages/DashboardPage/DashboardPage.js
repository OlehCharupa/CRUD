import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Container from '../../componets/container/Container';
import ListDashboard from '../../componets/listDashboard/ListDashboard';
import styles from "../ProfilesPage/ProfilePage.module.css"

const DashboardPage = () => {
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
                    <h1 className={styles.title}>Dashboard:</h1>
                    <ListDashboard />
                </div>
            </Container>
        </>
    );
};

export default DashboardPage;