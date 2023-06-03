import { useState } from "react";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import API from "../../config/api";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    picture: "",
  });
  const [loading, setLoading] = useState(false);

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function signup(e) {
    e.preventDefault();
    setLoading(true);

    const emptyFields = Object.keys(form).filter((field) => form[field] === "");
    if (emptyFields.length > 0) {
      const fieldsList = emptyFields.join(", ");
      alert(`Please fill in the following fields: ${fieldsList}`);
      setLoading(false);
      return;
    }

    const promise = API.signUp(form);
    promise
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          alert("The entered email is already registered.");
        } else {
          alert(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <S.Container>
      <S.Banner>
        <div>
          <h1>linkr</h1>
          <p>save, share and discover the best links on the web</p>
        </div>
      </S.Banner>
      <S.FormContainer>
        <form onSubmit={signup}>
          <S.Input
            data-test="email"
            type="email"
            placeholder="email"
            name="email"
            onChange={handleForm}
            value={form.email}
            disabled={loading}
          />
          <S.Input
            data-test="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={handleForm}
            value={form.password}
            disabled={loading}
          />
          <S.Input
            data-test="username"
            type="text"
            placeholder="username"
            name="username"
            onChange={handleForm}
            value={form.username}
            disabled={loading}
          />
          <S.Input
            data-test="picture-url"
            type="url"
            placeholder="picture url"
            name="picture"
            onChange={handleForm}
            value={form.picture}
            disabled={loading}
          />
          <S.Submit data-test="sign-up-btn" type="submit" disabled={loading}>
            {loading ? "..." : "Sign Up"}
          </S.Submit>
        </form>
        <Link data-test="login-link" to="/">
          Switch back to log in
        </Link>
      </S.FormContainer>
    </S.Container>
  );
}
