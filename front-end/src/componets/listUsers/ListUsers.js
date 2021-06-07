import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { paths } from '../../routes/routes';
import styles from "./ListUsers.module.css"


const ListUsers = () => {
    const users = useSelector(state => state.allUsers)

    const countProfile = (profiles) => {
        return profiles.reduce((acc, profile) => {
            return acc + 1
        }, 0)
    }

    return (
        <>
            <div className={styles.relative}>
                <div className={styles.container}>
                    <ul className={styles.list}>
                        {users.map(user => <li className={styles.item} key={user._id} id={user._id}>
                            <Link to={{ pathname: paths.user, state: { user: user } }}>
                                <p className={styles.name} title={user.name}>{user.name}</p>
                                <p className={styles.email} title={user.email}>{user.email}</p>
                                <p className={styles.profile}>{countProfile(user.profiles)}  profile</p>
                            </Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ListUsers;