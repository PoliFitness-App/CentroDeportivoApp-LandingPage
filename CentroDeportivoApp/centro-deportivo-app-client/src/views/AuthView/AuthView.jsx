import { Routes, Route, Navigate } from 'react-router-dom';

import classes from './AuthView.module.scss';

import LoginForm from '../../components/AuthForms/LoginForm/LoginForm';
import { useUserContext } from '../../contexts/UserContext';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {toast} from "react-toastify";

const AuthView = () => {
    const navigate = useNavigate();
    const { login, user } = useUserContext();

    const onLoginHandler = async (identifier, password) => {
        // Ejecutar el servicio de login <- User context
        await login(identifier, password);
    }

    useEffect(() => {
        if (user) {
            if (user.roles[0] === "admin"){
                navigate("/admin");
            }
            else if (user.roles[0] === "user"){
                navigate("*");
                toast.error("You are not an admin!");
            }
        }else
            navigate("/auth/signin");
    }, [user])

    return (
        <div className={classes["container"]}>
            <div className={classes["card"]}>
                <Routes>
                    <Route path='signin' element={<LoginForm onLogin={onLoginHandler} />} />
                    <Route path='*' element={<Navigate to="/not-found" />} />
                </Routes>
            </div>
        </div>
    )
}

export default AuthView;