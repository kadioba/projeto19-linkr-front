import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import API from "../../config/api.js";
import { useEffect, useState } from "react";
import useMyContext from "../../contexts/MyContext.jsx";

export default function SignInPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useMyContext();

  function login(e) {
    e.preventDefault();
    setLoading(true);
    const promise = API.fazerLogin(form);
    promise.then((res) => {
      setUser(res.data.token);
      navigate("/timeline");
    });
    promise
      .catch((err) => {
        alert(err.response.data.message);
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

  useEffect(() => {
    if (user) {
      navigate("/timeline");
    }
  }, [navigate, user]);

  return (
    <S.Container>
      <S.Banner>
        <div>
          <h1>linkr</h1>
          <p>save, share and discover the best links on the web</p>
        </div>
      </S.Banner>
      <S.FormContainer>
        <form onSubmit={login}>
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
          <S.Submit type="submit" disabled={loading}>
            {" "}
            {loading ? "..." : "Log In"}
          </S.Submit>
        </form>
        <Link to="/sign-up">First time? Create an account!</Link>
      </S.FormContainer>
    </S.Container>
  );
}
