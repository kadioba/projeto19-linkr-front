import { useState, useCallback } from "react";
import {
  PostFormButton,
  PostFormContainer,
  PostFormLinkInput,
  PostFormTextInput,
  PostFormTitle,
  ImagePlaceholder,
} from "./styles";
import API from "../../config/api";
import { useOutletContext } from "react-router-dom";

const initialFormState = { url: "", content: "" };

export default function PostForm({ user, token, loading }) {
  const [form, setForm] = useState(initialFormState);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setPosts, disabled, setDisabled } = useOutletContext();

  function getCurrentTimestamp() {
    const now = new Date();
    return now.toISOString();
  }

  async function publish(e) {
    e.preventDefault();
    setDisabled(true);

    setPosts((prev) => {
      const tempPost = {
        id: "temp_id",
        created_at: getCurrentTimestamp(),
        url_title: "...",
        url_description: "...",
        url_picture: "",
        user_id: user.id,
        picture: user.picture,
        username: user.username,
        liked_by: {},
        ...form,
      };
      const newPosts = [tempPost, ...prev];
      return newPosts;
    });

    try {
      await API.publishPost(token, form);
      await fetchPosts();
    } catch (err) {
      setPosts((prev) => {
        return prev.slice(1);
      });
      alert("There was an error publishing your link");
      setDisabled(false);
      setForm(initialFormState);
    }
  }

  async function fetchPosts() {
    try {
      const { data } = await API.getPosts(token);
      setPosts(data);
      setDisabled(false);
    } catch (err) {
      alert("An error occurred while trying to fetch the posts, please refresh the page");
    } finally {
      setDisabled(false);
      setForm(initialFormState);
    }
  }

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <PostFormContainer data-test="publish-box" onSubmit={publish}>
      <div>
        <ImagePlaceholder style={!imageLoaded ? {} : { display: "none" }} />
        <img
          src={user.picture}
          alt="Profile"
          onLoad={handleImageLoad}
          style={!imageLoaded ? { display: "none" } : {}}
        />
      </div>
      <div>
        <PostFormTitle>What are you going to share today?</PostFormTitle>
        <PostFormLinkInput
          data-test="link"
          placeholder="https://..."
          required
          type="text"
          name="url"
          onChange={handleForm}
          value={form.url}
          disabled={disabled}
        />
        <PostFormTextInput
          data-test="description"
          placeholder="Awesome article about #javascript"
          type="text"
          name="content"
          onChange={handleForm}
          value={form.content}
          disabled={disabled}
        />
        <div>
          <PostFormButton data-test="publish-btn" type="submit" disabled={disabled}>
            {disabled ? "Publishing..." : "Publish"}
          </PostFormButton>
        </div>
      </div>
    </PostFormContainer>
  );
}
