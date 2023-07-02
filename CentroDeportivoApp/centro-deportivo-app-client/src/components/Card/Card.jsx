import classes from './Card.module.scss';
import Button from "../Button/Button.jsx";


// Import icon
import { MdClose } from "react-icons/md";
const Card = (
    { title, description, image, category, onDelete = () => { } }
) => {
    return (
        <div className={classes["card"]}>
            <div className={classes["image-content"]}>
                <Button className={classes["button"]} onClick={() =>{onDelete()}} > <MdClose/> </Button>
                <div className={classes["card-image"]}>
                    <img src={image} alt="" className={classes["card-img"]}></img>
                </div>
            </div>
            <div className={classes["card-content"]}>
                <h2 className={classes["name"]}>{title}</h2>
                <p className={classes["description"]}>{description}</p>
                <p className={classes["category"]}>{category}</p>
            </div>
        </div>
    )
}

export default Card;