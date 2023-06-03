import { useState } from "react";
import { PostFormButton, PostFormContainer, PostFormLinkInput, PostFormTextInput, PostFormTitle } from "./styles";
import API from "../../config/api";

export default function PostForm(props) {
  const [form, setForm] = useState({ url: "", content: "" });

  const loading = props.loading;
  const setLoading = props.setLoading;

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

  return (
    <PostFormContainer data-test="publish-box" onSubmit={publish}>
      <div>
        <img src={props.userPicture} alt="" />
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