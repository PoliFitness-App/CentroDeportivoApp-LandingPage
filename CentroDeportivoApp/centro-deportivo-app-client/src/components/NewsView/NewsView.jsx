import {useState, useEffect} from 'react';

import classes from './NewsView.module.scss';
import Card from "../Card/Card.jsx";

// We import axios

import {toast} from 'react-toastify';

import axios from 'axios';
import {useConfigContext} from '../../contexts/ConfigContext';
import NewsForm from "./NewsForm/NewsForm.jsx";
import {MdArrowBackIosNew} from "react-icons/md";
import {useNavigate} from "react-router-dom";

const NewsView = () => {

    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const {startLoading, stopLoading} = useConfigContext();

    // This hook is used to fetch the posts from the API, it is called when the component is mounted
    useEffect(() => {
        fetchPosts();
    }, []);

    /*
    * This function fetches the posts from the API
     */
    const fetchPosts = async () => {
        try {
            startLoading();
            const {data} = await axios.get("/post");
            setPosts(data.posts);
        } catch (error) {
            toast.error("Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    /*
    * This function deletes a post from the API
     */

    const deletePost = async (id) => {
        try {
            startLoading();
            await axios.patch(`/post/deletePost/${id}`);
            toast.success("New deleted!");
            fetchPosts();
        } catch (error) {
            toast.error("Unexpected error!");
        } finally {
            stopLoading();
        }
    }

    /*
    * This function saves a post to the API
     */
    const savePost = async (title, description, image, category) => {
        try {
            startLoading();
            await axios.post("/post/createPost", {title, image, description, category});
            toast.success("Post saved!");
        } catch (error) {
            const {status} = error.response || {status: 500};
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
    * On Add Post Handler
     */
    const onAddPostHandler = async (title, description, image, category) => {
        await savePost(title, description, image, category);
        fetchPosts();
    }

    /*
    * On Delete Post Handler
     */
    const onDeletePostHandler = async (id) => {
        await deletePost(id);
        fetchPosts();
    }

    /*
    * This function maps the posts to the Card component
     */

    const mappedCards = posts.map(post => {
        return (
            <Card
                key={post._id}
                title={post.title}
                description={post.description}
                image={post.image}
                category={post.category}
                onDelete={() => {
                    onDeletePostHandler(post._id)
                }}
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
                <NewsForm onAddPost={onAddPostHandler}/>
            </div>
            <div className={classes["Row-Cards"]}>
                {mappedCards}
            </div>
        </div>
    )
}

export default NewsView