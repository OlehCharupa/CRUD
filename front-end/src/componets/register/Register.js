import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/routes';
import Container from '../container/Container';
import styles from "./Register.module.css"
import { registrationOperations } from "../../redux/operations/authOperation"

const initialData = {
    name: "",
    email: "",
    password: "",
    role: "user"
}


const Register = () => {
    const [data, setData] = useState(initialData)
    const { name, email, password } = data

    const dispatch = useDispatch()

    const inputHeandler = ({ target }) => {
        const { name, value } = target
        setData((state) => ({ ...state, [name]: value }))
    }

    const submitHeandler = (e) => {
        e.preventDefault()
        dispatch(registrationOperations(data))
        setData(initialData)
    }

    return (
        <Container>
            <div className={styles.wrapperSection}>
                <h1 className={styles.title}>Create your account</h1>
                <form onSubmit={submitHeandler} className={styles.form}>
                    <div className={styles.wrapperInput}>
                        <label
                            className={styles.label}
                            htmlFor="name">
                            User Name
                        </label>
                        <input
                            required
                            onChange={inputHeandler}
                            type="text"
                            name="name"
                            value={name}
                            className={styles.input}
                            id="name" />
                    </div>
                    <div className={styles.wrapperInput}>
                        <label
                            className={styles.label}
                            htmlFor="email">
                            Email
                        </label>
                        <input
                            required
                            onChange={inputHeandler}
                            type="email"
                            name="email"
                            value={email}
                            className={styles.input}
                            id="email" />
                    </div>
                    <div className={styles.wrapperInput}>
                        <label
                            className={styles.label}
                            htmlFor="password">
                            Password
                        </label>
                        <input
                            required
                            onChange={inputHeandler}
                            type="password"
                            name="password"
                            value={password}
                            className={styles.input}
                            id="password" />
                    </div>
                    <div className={styles.wrapperInputRole}>
                        <input
                            onClick={inputHeandler}
                            type="radio"
                            name="role"
                            className={styles.inputRole}
                            value="admin"
                            id="role"
                        />
                        <label
                            className={styles.labelRole}
                            htmlFor="role">
                            is admin
                    </label>
                    </div>
                    <button className={styles.btnSubmit}>Sign Up</button>
                </form>

                <NavLink to={paths.login} className={styles.redirect}>Sign In</NavLink>
            </div>
        </Container>
    );
};

export default Register;