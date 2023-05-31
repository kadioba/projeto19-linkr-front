import { useState } from "react";
import { PostFormButton, PostFormContainer, PostFormLinkInput, PostFormTextInput, PostFormTitle } from "./styles";
import axios from "axios";
import API from "../../config/api";

export default function PostForm(props) {

    const [form, setForm] = useState({ url: "", content: "" });

    const loading = props.loading;
    const setLoading = props.setLoading;

    console.log(props.posts)

    function publish(e) {
        e.preventDefault();
        setLoading(true);
        const promise = API.enviarPost(props.token, form);
        //axios.post(`http://localhost:5000/post`, form, { headers: { Authorization: `Bearer ${props.token}` } });
        promise.then((res) => {
            setForm({ url: "", content: "" });
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            alert("Houve um erro ao publicar seu link");
        });
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <PostFormContainer onSubmit={publish}>
            <img src={props.userPicture} alt="" />
            <div>
                <PostFormTitle>What are you going to share today?</PostFormTitle>
                <PostFormLinkInput
                    placeholder="https://..."
                    required
                    type="text"
                    name="url"
                    onChange={handleForm}
                    value={form.url}
                    disabled={loading}
                />
                <PostFormTextInput
                    placeholder="Awesome article about #javascript"
                    type="text"
                    name="content"
                    onChange={handleForm}
                    value={form.content}
                    disabled={loading}
                />
                <PostFormButton type="submit" disabled={loading}>{loading ? "Publishing..." : "Publish"}</PostFormButton>
            </div>
        </PostFormContainer>
    )
}