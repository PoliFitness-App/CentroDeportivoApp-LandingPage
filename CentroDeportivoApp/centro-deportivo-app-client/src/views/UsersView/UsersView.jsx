import { useState, useEffect } from 'react';

import classes from './UserView.module.scss';

// We import axios

import { toast } from 'react-toastify';

import axios from 'axios';

import { useConfigContext } from '../../contexts/ConfigContext';
import UserCard from "../../components/UserCard/UserCard.jsx";
import UserCount from "../../components/UserCard/UserCount/UserCount.jsx";
import {MdArrowBackIosNew} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const UsersView = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const {startLoading, stopLoading} = useConfigContext();

    // This hook is used to fetch the posts from the API, it is called when the component is mounted
    useEffect(() => {
        fetchUsers();
    }, []);

    /*
    * This function fetches the posts from the API
     */
    const fetchUsers = async () => {
        try {
            startLoading();
            const { data } = await axios.get("/auth/");
            setUsers(data.users);
        } catch (error) {
            toast.error("Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    /*
    * This function deletes a user from the API
     */

    const deleteUser = async (id) => {
        try {
            startLoading();
            await axios.patch(`/auth/deleteUser/${id}`);
            toast.success("User deleted!");
            fetchUsers();
        } catch (error) {
            toast.error("Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    /*
    * This function updates the user role
     */
    const updateRole = async (id, roles) => {
        let _id = id
        try {
            startLoading();
            await axios.post("/auth/setRol", { roles, _id});
            toast.success("User updated!");
        } catch (error) {
            const { status } = error.response || { status: 500 };
            const msg = {
                "400": "Wrong fields",
                "404": "Not Found",
                "500": "Something went wrong!"
            }
            toast.error(msg[status.toString()] || "Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    /*
    * On Delete Post Handler
     */
    const onDeleteUserHandler = async (id) => {
        await deleteUser(id);
        fetchUsers();
    }

    const onRoleUpdateHandler = async (id, roles) => {
        await updateRole(id, roles);
        fetchUsers();
    }

    /*
    * This function maps the posts to the Card component
     */

    const mappedUsers = users.map(user => {
        return (
            <UserCard
                key = {user._id}
                username = {user.username}
                lastname = {user.lastname}
                email = {user.email}
                gender={user.gender}
                role = {user.roles}
                onDelete = {() => { onDeleteUserHandler(user._id) }}
                onUpdate = {(rolesField) => { onRoleUpdateHandler(user._id, rolesField) }}
            />
        );
    })

    return (
        <div className={classes["card-view-container"]}>
            <div className={classes["Add-card-section"]}>
                <div className={classes["back-button"]}  onClick={() => navigate("/admin")}>
                    <MdArrowBackIosNew
                    />
                    <p>Regresar</p>
                </div>
               <UserCount count={users.length}/>
            </div>
            <div className={classes["Row-Cards"]}>
                {mappedUsers}
            </div>
        </div>
    )
}

export default UsersView