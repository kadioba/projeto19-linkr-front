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

export default function PostForm({ loading, setLoading, setPosts, token, userPicture, user }) {
  const [form, setForm] = useState({ url: "", content: "" });
  const [imageLoaded, setImageLoaded] = useState(false);

  function getCurrentTimestamp() {
    const now = new Date();
    return now.toISOString();
  }

  function publish(e) {
    e.preventDefault();

    const tempPost = {
      id: 99999,
      created_at: getCurrentTimestamp(),
      url_title: "...",
      url_description: "...",
      url_picture: "",
      user_id: user.id,
      picture: user.picture,
      username: user.username,
      liked_by: {},
    };

    setLoading(true);
    setPosts((prev) => {
      const newForm = { ...tempPost, ...form };
      const newPosts = [newForm, ...prev];
      return newPosts;
    });

    const promise = API.publishPost(token, form);
    promise
      .then((_res) => {
        setForm({ url: "", content: "" });
      })
      .catch((err) => {
        setPosts((prev) => {
          return prev.slice(1);
        });
        alert("There was an error publishing your link", err);
      })
      .finally(() => {
        setLoading(false);
      });
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
          src={userPicture}
          alt="Profile Picture"
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
          disabled={loading}
        />
        <PostFormTextInput
          data-test="description"
          placeholder="Awesome article about #javascript"
          type="text"
          name="content"
          onChange={handleForm}
          value={form.content}
          disabled={loading}
        />
        <div>
          <PostFormButton data-test="publish-btn" type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish"}
          </PostFormButton>
        </div>
      </div>
    </PostFormContainer>
  );
}
