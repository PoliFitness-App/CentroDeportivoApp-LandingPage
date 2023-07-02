import classes from './HomeCards.module.scss';
import Button from "../Button/Button.jsx";

const HomeCard = (
    { title, Icon, text ,onClick = () => { }}
) => {
    return (
        <div className={classes["card"]}>
            <div className={classes["image-content"]}>
                <div className={classes["card-image"]}>
                    <Icon className={classes["card-img"]}/>
                </div>
            </div>
            <div className={classes["card-content"]}>
                <h2 className={classes["name"]}>{title}</h2>
                <p className={classes["category"]}>{text}</p>
            </div>
            <div className={classes.Buttons}>
                <Button onClick={() =>{onClick()}} > Ver más </Button>
            </div>
        </div>
    )
}

export default HomeCard;