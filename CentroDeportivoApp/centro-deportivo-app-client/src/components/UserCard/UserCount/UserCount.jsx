import {useState} from 'react';
import {toast} from 'react-toastify';
import Button from '../../Button/Button';
import classes from './UserCount.module.scss';
import {MdEditNote} from "react-icons/md";


const UserCount = ({count}) => {
    return (
        <section className={classes["users-count"]}>
            <h3> Cantidad de usuarios registrados </h3>
            <div className={classes["count"]}>
                <h1>{count}</h1>
            </div>
        </section>
    );
}

export default UserCount;