import { useState, useCallback } from "react";
import { PostFormButton, PostFormContainer, PostFormLinkInput, PostFormTextInput, PostFormTitle, ImagePlaceholder } from "./styles";
import API from "../../config/api";

export default function PostForm(props) {
  const [form, setForm] = useState({ url: "", content: "" });

  const loading = props.loading;
  const setLoading = props.setLoading;
  const [imageLoaded, setImageLoaded] = useState(false);

  function publish(e) {
    e.preventDefault();
    setLoading(true);
    const promise = API.publishPost(props.token, form);
    promise
      .then((res) => {
        setForm({ url: "", content: "" });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("There was an error publishing your link");
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
        <img src={props.userPicture} alt="Profile Picture" onLoad={handleImageLoad} style={!imageLoaded ? { display: "none" } : {}}/> 
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
