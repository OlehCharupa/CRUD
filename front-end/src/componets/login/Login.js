import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { loginOperations } from '../../redux/operations/authOperation';
import { paths } from '../../routes/routes';
import Container from '../container/Container';
import styles from "./Login.module.css"


const initialData = {
    email: "",
    password: ""
}


const Login = () => {
    const [data, setData] = useState(initialData)
    const { email, password } = data

    const dispatch = useDispatch()

    const inputHeandler = ({ target }) => {
        const { name, value } = target
        setData((state) => ({ ...state, [name]: value }))
    }
    const submitHeandler = (e) => {
        e.preventDefault()
        dispatch(loginOperations(data))
        setData(initialData)
    }


    return (
        <Container>
            <div className={styles.wrapperSection}>
                <h1 className={styles.title}>Sign in</h1>
                <form onSubmit={submitHeandler} className={styles.form}>
                    <div className={styles.wrapperInput}>
                        <label
                            className={styles.label}
                            htmlFor="email">
                            Email
                        </label>
                        <input
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
                            onChange={inputHeandler}
                            type="password"
                            name="password"
                            value={password}
                            className={styles.input}
                            id="password" />
                    </div>
                    <button className={styles.btnSubmit}>Sign In</button>
                </form>

                <NavLink to={paths.registration} className={styles.redirect}>Sign Up</NavLink>
            </div>
        </Container>

    );
};

export default Login;