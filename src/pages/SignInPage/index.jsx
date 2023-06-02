import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import API from "../../config/api";
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

    const emptyFields = Object.keys(form).filter((field) => form[field] === "");
    if (emptyFields.length > 0) {
      const fieldsList = emptyFields.join(", ");
      alert(`Please fill in the following fields: ${fieldsList}`);
      setLoading(false);
      return;
    }

    const promise = API.signIn(form);
    promise
      .then((res) => {
        setUser(res.data.token);
        navigate("/timeline");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Incorrect email or password.");
        } else {
          alert(err.response.data);
        }
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
          <S.Submit data-test="login-btn" type="submit" disabled={loading}>
            {" "}
            {loading ? "..." : "Log In"}
          </S.Submit>
        </form>
        <Link data-test="sign-up-link" to="/sign-up">
          First time? Create an account!
        </Link>
      </S.FormContainer>
    </S.Container>
  );
}
