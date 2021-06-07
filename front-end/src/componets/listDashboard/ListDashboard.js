import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { paths } from '../../routes/routes';
import styles from "./ListDashboard.module.css"

const ListDashboard = () => {
    const users = useSelector(state => state?.allUsers)

    const profileAll = []
    users.map((user) => user.profiles.map(profile => profileAll.push(profile)))

    const profileFilterAge = []
    // eslint-disable-next-line array-callback-return
    users && users.map((user) => user?.profiles.map(profile => {
        const value = profile.birthdate;
        const valueWithoutDash = value.replace(/\./g, '');

        if (valueWithoutDash.length === 8) {
            const arrBirth = value.split(".");
            const birth = new Date(arrBirth[2], arrBirth[1] - 1, arrBirth[0]);
            let today = new Date();
            const yearsOld18 = new Date();
            yearsOld18.setFullYear(today.getFullYear() - 18)
            if (birth < yearsOld18) {

                profileFilterAge.push(profile)
            }
        }


    })
    )
    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <Link
                    to={paths.users}
                >
                    <h2 className={styles.title}>Users:</h2>
                    <p className={styles.text}>{users.length}</p>
                </Link>
            </li>
            <li className={styles.item}>
                <Link
                    to={{ pathname: paths.profiles, state: { profiles: profileAll } }}
                >
                    <h2 className={styles.title}>Profiles:</h2>
                    <p className={styles.text}>{profileAll.length}</p>
                </Link>
            </li>
            <li className={styles.item}>
                <Link
                    to={{ pathname: paths.profiles, state: { profiles: profileFilterAge } }}

                >
                    <h2 className={styles.title}>Profiles over 18 years old:</h2>
                    <p className={styles.text}>{profileFilterAge.length}</p>
                </Link>
            </li>
        </ul>
    );
};

export default ListDashboard;