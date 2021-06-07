import React from 'react';
import Container from '../container/Container';
import styles from "./Header.module.css"
import avatarAdmin from "./images/avatarAdmin.svg"
import avatarUser from "./images/avatarUser.svg"
import iconDashboard from "./images/iconDashboard.svg"
import iconProfiles from "./images/iconProfiles.svg"
import iconUsers from "./images/iconUsers.svg"
import { isAdmin } from "../../redux/selectors/selectors"
import { useDispatch, useSelector } from 'react-redux';
import { paths } from "../../routes/routes"
import { NavLink } from 'react-router-dom';
import { logOut } from '../../redux/operations/authOperation';

const Header = () => {
    const isAdminState = useSelector(isAdmin)
    const name = useSelector(state => state.currentUser?.name)
    const dispath = useDispatch()

    const logout = () => {
        dispath(logOut())
    }


    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.userInfo}>
                        <img className={styles.avatar} src={isAdminState ? avatarAdmin : avatarUser} alt="avatar" width="48px" height="48px" />
                        <p className={styles.userName}>{name}</p>
                    </div>
                    <ul className={styles.navList}>
                        <li className={styles.navItem} >
                            <NavLink
                                to={paths.profiles}
                                className={styles.link}
                                activeClassName={styles.link_active}
                            >
                                Profiles
                            </NavLink>
                            <img className={styles.icon} src={iconProfiles} alt="icon" width="16px" height="20px" />
                        </li>
                        {isAdminState
                            && <li className={styles.navItem} >
                                <NavLink
                                    to={paths.dashboard}
                                    className={styles.link}
                                    activeClassName={styles.link_active}
                                >
                                    Dashboard
                            </NavLink>
                                <img className={styles.icon} src={iconDashboard} alt="icon" width="15px" height="15px" />
                            </li>}
                        {isAdminState && <li className={styles.navItem} >
                            <NavLink
                                to={paths.users}
                                className={styles.link}
                                activeClassName={styles.link_active}
                            >
                                Users
                            </NavLink>
                            <img className={styles.icon} src={iconUsers} alt="icon" width="20px" height="14px" />
                        </li>
                        }
                        <li className={styles.navItem} >
                            <NavLink
                                to={paths.login}
                                className={styles.link}
                                activeClassName={styles.link_active}
                                onClick={logout}
                            >
                                Log out
                        </NavLink>
                        </li>

                    </ul>
                </div>
            </Container>
        </header>
    );
};

export default Header;