import classes from './Header.module.scss';
import logo from '../../assets/uca_logo.png';
import Button from '../Button/Button';

import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';

const Header = () => {
    const { logout, user } = useUserContext();
    const navigate = useNavigate();

    return (
        <header className={classes["Header"]}>
            <div className={classes["Title"]}>

                <figure>
                    <img src={logo} alt={"UCA LOGO"}/>
                </figure>

                <span>
                    CentroDeportivo <span> <br/> App </span>
                </span>

            </div>


            <div className={classes["Buttons"]}>
                <Button onClick={() => { window.open("https://app.swaggerhub.com/apis-docs/00030821/CentroDeportivoApp/1.0.0", "_blank") }}> API </Button>
                {
                    !user ?
                        <>
                            <Button onClick={() => navigate("/auth/signin")}> Iniciar sesion </Button>
                        </> :
                        <>
                            <Button onClick={() => { logout() }}> Cerrar sesión</Button>
                        </>
                }
            </div>
        </header>
    );
}

export default Header;