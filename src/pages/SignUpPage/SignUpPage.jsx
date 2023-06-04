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
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const getEmptyFields = (form) => {
    return Object.keys(form).filter((field) => form[field] === "");
  };

  const alertEmptyFields = (emptyFields) => {
    const fieldsList = emptyFields.join(", ");
    alert(`Please fill in the following fields: ${fieldsList}`);
  };

  const isFieldLengthValid = (fieldValue) => {
    return fieldValue.length >= 3;
  };

  const alertInvalidFields = (isUsernameValid, isPasswordValid) => {
    let alertMessage = "";

    if (!isUsernameValid && !isPasswordValid) {
      alertMessage = "Username and password should be at least 3 characters long.";
    } else if (!isUsernameValid) {
      alertMessage = "Username should be at least 3 characters long.";
    } else {
      alertMessage = "Password should be at least 3 characters long.";
    }

    alert(alertMessage);
  };

  const handleSignInError = (error) => {
    if (error.response?.status === 409) {
      alert("The entered email is already registered.");
    } else {
      alert(error);
    }
  };

  const signUpUser = (form) => {
    return API.signUp(form);
  };

  function signup(event) {
    event.preventDefault();
    setLoading(true);

    const emptyFields = getEmptyFields(form);
    if (emptyFields.length > 0) {
      alertEmptyFields(emptyFields);
      setLoading(false);
      return;
    }

    const { username, password } = form;
    const isUsernameValid = isFieldLengthValid(username);
    const isPasswordValid = isFieldLengthValid(password);

    if (!isUsernameValid || !isPasswordValid) {
      alertInvalidFields(isUsernameValid, isPasswordValid);
      setLoading(false);
      return;
    }

    signUpUser(form)
      .then((_response) => {
        // setIsSignUpSuccessful(true);
        navigate("/");
      })
      .catch(handleSignInError)
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
        {isSignUpSuccessful && <S.SuccessMessage>Success! Redirecting to Sign In...</S.SuccessMessage>}
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
