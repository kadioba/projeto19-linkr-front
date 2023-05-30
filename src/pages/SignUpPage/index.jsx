import { useState } from "react";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import API from "../../config/api.js";

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
    const promise = API.fazerCadastro(form);
    promise.then(() => {
      navigate("/");
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
    promise.finally(() => {
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
            required
            type="email"
            placeholder="email"
            name="email"
            onChange={handleForm}
            value={form.email}
            disabled={loading}
          />
          <S.Input
            required
            minLength={3}
            type="password"
            placeholder="password"
            name="password"
            onChange={handleForm}
            value={form.password}
            disabled={loading}
          />
          <S.Input
            required
            type="text"
            placeholder="username"
            name="username"
            onChange={handleForm}
            value={form.username}
            disabled={loading}
          />
          <S.Input
            required
            type="url"
            placeholder="picture url"
            name="picture"
            onChange={handleForm}
            value={form.picture}
            disabled={loading}
          />
          <S.Submit type="submit" disabled={loading}>
            {loading ? "..." : "Sign Up"}
          </S.Submit>
        </form>
        <Link to="/">Switch back to log in</Link>
      </S.FormContainer>
    </S.Container>
  );
}
