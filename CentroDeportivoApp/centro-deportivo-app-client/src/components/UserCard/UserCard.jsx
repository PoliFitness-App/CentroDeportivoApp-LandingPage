import classes from './UserCard.module.scss';
import Button from "../Button/Button.jsx";

// Import icon
import { MdClose, MdEdit } from "react-icons/md";
import user_woman from '../../assets/user_women.png'
import user_men from '../../assets/user_man.png'
import {useState} from "react";

const UserCard = (
    { username, lastname , email , gender, role ,onDelete = () => { }, onUpdate = (rolesField) => {} }
) => {

    const [rolesField, setRoles] = useState(role);

    let img = ""

    if (gender){
        img = user_men
    }else
        img = user_woman

    return (
        <div className={classes["card"]}>
            <div className={classes["image-content"]}>
                <div className={classes["card-image"]}>
                    <img src={img} alt="" className={classes["card-img"]}></img>
                </div>
            </div>
            <div className={classes["card-content"]}>
                <h2 className={classes["name"]}>{username} {lastname}</h2>
                <p className={classes["category"]}>{email}</p>
                <select
                    name="opcion"
                    onChange={(e) => {
                        setRoles(e.target.value)
                    }}
                    className={classes["select"]}
                    value={rolesField}
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
            <div className={classes.Buttons}>
                <Button className={classes["button"]} onClick={() =>{onDelete()}} > <MdClose/> </Button>
                <Button className={classes["button"]} onClick={() =>{onUpdate(rolesField)}} > <MdEdit/> </Button>
            </div>
        </div>
    )
}

export default UserCard;