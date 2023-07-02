import {useState, useEffect} from 'react';

import classes from './HomeView.module.scss';

// We import axios
import HomeCard from "../../components/HomeCard/HomeCards.jsx";
import {MdNewspaper, MdPersonSearch} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../contexts/UserContext.jsx";

const HomeView = () => {

    const navigate = useNavigate();
    const {user} = useUserContext();

    useEffect(() => {
        if (!user) {
            navigate("/auth/signin")
        }
    }, []);

    return (
        <div className={classes["card-view-container"]}>

            <div className={classes["Row-Cards"]}>
                <HomeCard
                    title="Administracion de usuarios"
                    Icon={MdPersonSearch}
                    text={"Aqui podras administrar los usuarios de la plataforma"}
                    onClick={() => navigate("/users")}
                />
            </div>
            <div className={classes["Row-Cards"]}>
                <HomeCard
                    title="Administración de noticias"
                    Icon={MdNewspaper}
                    text={"Aqui podras administrar las noticias de la plataforma"}
                    onClick={() => navigate("/news")}
                />
            </div>
        </div>
    )
}

export default HomeView