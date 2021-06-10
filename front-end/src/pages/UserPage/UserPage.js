import React, { useEffect, useState } from 'react';
import styles from "./UserPage.module.css"
import Container from "../../componets/container/Container"
import iconEdit from "../../componets/listProfiles/images/iconEdit.svg"
import iconDelete from "../../componets/listProfiles/images/iconDelete.svg"
import ListProfile from "../../componets/listProfiles/ListProfiles"
import Modal from '../../componets/modal/Modal';
import EditUser from '../../componets/editUser/EditUser';
import { useHistory, useLocation } from 'react-router';
import { deleteUser } from "../../redux/operations/user"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { paths } from '../../routes/routes';

const UserPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [data, setData] = useState({})
    const { name, email, role, _id, profiles } = data
    const [openModal, setOpenModal] = useState(false)

    const isAdmin = useSelector(state => state.currentUser.role === "admin")
    const history = useHistory()
    useEffect(() => {
        if (!isAdmin) {
            history.push("/profiles")
        } else {
            setData(location.state.user)
        }
    }, [isAdmin, history, location])

    // useEffect(() => {

    // }, [location])

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const deleteItem = (id) => {
        dispatch(deleteUser(id))
        // history.push({ path: "/users" })
    }

    return (
        <>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.userInfo}>
                        <p className={styles.name}>{name}</p>
                        <p className={styles.email}>{email}</p>
                        <p className={styles.role}>{role}</p>
                        <div className={styles.wrapperButton}>
                            <img onClick={toggleModal} src={iconEdit} alt="iconEdit" className={styles.iconEdit} width="24px" height="24px" />
                            <Link to={paths.users}>
                                <img onClick={() => deleteItem(_id)} src={iconDelete} alt="iconEdit" className={styles.iconDelete} width="24px" height="24px" />
                            </Link>
                        </div>
                    </div>
                    <h1 className={styles.title}>Profiles:</h1>
                    <ListProfile profiles={profiles} minList={true} />
                </div>
            </Container>
            <Modal
                arrowVisible
                toggleModal={toggleModal}
                openModal={openModal}
            >
                <EditUser toggleModal={toggleModal} user={data} />
            </Modal>
        </>
    );
};

export default UserPage;