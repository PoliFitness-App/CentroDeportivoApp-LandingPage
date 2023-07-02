import {useState} from 'react';
import {toast} from 'react-toastify';
import Button from '../../Button/Button';
import classes from './NewsForm.module.scss';
import {MdEditNote} from "react-icons/md";


const NewsForm = ({
                      onAddPost = () => {
                      }
                  }) => {
    const [titleField, setTitle] = useState("");
    const [descriptionField, setDescription] = useState("");
    const [imageField, setImage] = useState("");
    const [categoryField, setCategory] = useState("Fútbol");

    const errors = {
        "title": !titleField,
        "description": !descriptionField || descriptionField.length > 280,
        "image": imageField.length > 0 && !(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(imageField)
    }

    const hasErrors = () => {
        return Object.values(errors).some(error => error);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (hasErrors()) {
            toast.warn("Your fields are wrong!")
            return;
        }

        //Ejecutar el insert al server
        onAddPost(titleField, descriptionField, imageField, categoryField);

        setTitle("");
        setDescription("");
        setImage("")
        setCategory("Fútbol")
    }

    return (
        <section className={classes["post-form-section"]}>
            <h3> Agrega una noticia </h3>

            <form onSubmit={onSubmitHandler}>
                <label>
                    Título de la publicación
                    <input
                        name="title"
                        className={errors["title"] ? classes["error"] : ""}
                        value={titleField}
                        placeholder='Título de la publicación'
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </label>

                <label>
                    Descripción
                    <textarea
                        name="description"
                        className={classes["desc"]}
                        rows={5}
                        value={descriptionField}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        placeholder="Descripción"
                    />

                    <div className={classes["chars-left"]}>
                        {descriptionField.length} / 280
                    </div>
                </label>

                <label>
                    Imagen (URL)
                    <input
                        name="image"
                        className={errors["image"] ? classes["error"] : ""}
                        type="url"
                        placeholder='https://example.io/image.png'
                        value={imageField}
                        onChange={(e) => {
                            setImage(e.target.value)
                        }}/>
                </label>

                <label>
                    Categoría
                    <select
                        name="opcion"
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                        className={classes["select"]}
                        value={categoryField}
                    >
                        <option value="Fútbol">Fútbol</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Basketball">Baloncesto</option>
                        <option value="Actividades">Actividades</option>
                    </select>
                </label>


                <Button type="submit" disabled={hasErrors()}>
                    Guardar
                </Button>
            </form>
        </section>
    );
}

export default NewsForm;