import React from 'react';
import Container from '../../componets/container/Container';
import ListDashboard from '../../componets/listDashboard/ListDashboard';
import styles from "../ProfilesPage/ProfilePage.module.css"

const DashboardPage = () => {
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