import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../Button/Button';

import classes from './../LoginForm/LoginForm.module.scss';
import {MdClose} from "react-icons/md";

import image from "../../../assets/login_img.png";

const LoginForm = ({ onLogin = () => { } }) => {
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const errors = {
        "identifier": !identifier,
        "password": !password,
    }

    const hasErrors = () => Object.values(errors).some(error => error);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (hasErrors()) {
            toast.warn("Wrong fields");
            return;
        }

        onLogin(identifier, password);
    }

    return (
        <section className={classes["container"]}>
            <p> Hey!</p>
            <h3> Bienvenido de nuevo </h3>
            <div className={classes["image-content"]}>
                <div className={classes["card-image"]}>
                    <img src={image} alt="" className={classes["card-img"]}></img>
                </div>
            </div>

            <form onSubmit={onSubmitHandler}>
                <label>
                    Nombre de usuario o correo electrónico...
                    <input
                        className={errors["identifier"] ? classes["error"] : ""}
                        type={"text"}
                        name="identifier"
                        autoComplete='username'
                        value={identifier}
                        placeholder="Nombre de usuario o correo electrónico..."
                        onChange={({ target }) => { setIdentifier(target.value) }} />
                </label>

                <label>
                    Contraseña...
                    <input
                        className={errors["password"] ? classes["error"] : ""}
                        type={"password"}
                        name="password"
                        autoComplete='current-password'
                        value={password}
                        placeholder="Password..."
                        onChange={({ target }) => { setPassword(target.value) }} />
                </label>

                <Button type="submit" disabled={hasErrors()}>
                    Iniciar sesión
                </Button>
            </form>
        </section>

    );
}

export default LoginForm;